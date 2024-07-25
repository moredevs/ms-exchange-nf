import { Injectable, NotFoundException } from '@nestjs/common';
import { ITransactionService } from './transactions.interface.service';
import { ApiResponse } from '../dto/api-reponse.dto';
import { TipoCambioDto } from '../dto/tipo-cambio.dto';
import { TipoCambioRequestDto } from '../dto/tipo-cambio.request.dto';
import { TransaccionDto } from '../dto/transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Moneda } from '../model/moneda.entity';
import { TipoCambio } from '../model/tipo-cambio.entity';
import {  Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { Transaccion } from '../model/transaccion.entity';

@Injectable()
export class TransactionsService implements ITransactionService {

    constructor(
        @InjectRepository(Moneda)
        private readonly monedaRepository: Repository<Moneda>,
        @InjectRepository(TipoCambio)
        private readonly tipoCambioRepository: Repository<TipoCambio>,
        @InjectRepository(Transaccion)
        private readonly transaccionRepository: Repository<Transaccion>
      ) {}
      
      async registrarTipoDeCambio(tipoCambioRequestDto: TipoCambioRequestDto): Promise<ApiResponse<TipoCambioDto>> {
        const [monedaOrigen, monedaDestino] = await this.validarExistenciaMonedas(
            tipoCambioRequestDto.monedaOrigen,
            tipoCambioRequestDto.monedaDestino,
          );
          
          const tipoCambio = this.tipoCambioRepository.create({
            ...plainToClass(TipoCambio, tipoCambioRequestDto),
            monedaOrigen,
            monedaDestino,
          });

        const savedTipoDeCambio = await this.tipoCambioRepository.save(tipoCambio);
    
        return new ApiResponse(1, 'Registro exitoso', plainToClass(TipoCambioDto, savedTipoDeCambio));
      }

      async realizarTipoDeCambio(tipoCambioRequestDto: TipoCambioRequestDto): Promise<ApiResponse<TransaccionDto>> {
         await this.validarExistenciaMonedas(
            tipoCambioRequestDto.monedaOrigen,
            tipoCambioRequestDto.monedaDestino,
          );

          const tipoCambio = await this.tipoCambioRepository
          .createQueryBuilder('tipoCambio')
          .innerJoin('tipoCambio.monedaOrigen', 'monedaOrigen')
          .innerJoin('tipoCambio.monedaDestino', 'monedaDestino')
          .where('monedaOrigen.codigo = :codigoMonedaOrigen', { codigoMonedaOrigen : tipoCambioRequestDto.monedaOrigen })
          .orWhere('monedaDestino.codigo = :codigoMonedaDestino', { codigoMonedaDestino: tipoCambioRequestDto.monedaDestino })
          .getOne();
        
          if (!tipoCambio) {
            throw new NotFoundException('Tipo de cambio no existe');
          }
          tipoCambioRequestDto.tipoCambioId=tipoCambio.id;
          tipoCambioRequestDto.montoConvertido= tipoCambioRequestDto.monto * tipoCambio.valor 
 
          
       let response = await this.transaccionRepository.save( plainToClass(Transaccion, tipoCambioRequestDto));
        return new ApiResponse(1, 'Transaccion exitosa', new TransaccionDto(response,tipoCambio.valor));
    }

    private async validarExistenciaMonedas(codigoMonedaOrigen: string, codigoMonedaDestino: string): Promise<[Moneda, Moneda]> {
        const monedaOrigen = await this.monedaRepository.findOne({ where: { codigo: codigoMonedaOrigen } });
        const monedaDestino = await this.monedaRepository.findOne({ where: { codigo: codigoMonedaDestino } });
    
        if (!monedaOrigen || !monedaDestino) {
          throw new NotFoundException('Moneda no existe');
        }
    
        return [monedaOrigen, monedaDestino];
      }

}
