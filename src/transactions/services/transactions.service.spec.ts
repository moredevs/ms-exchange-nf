import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsService } from '../../transactions/services/transactions.service';
import { Usuario } from '../../auth/model/usuario.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiResponse } from '../dto/api-reponse.dto';
import { TipoCambioRequestDto } from '../dto/tipo-cambio.request.dto';
import { TransaccionDto } from '../dto/transaction.dto';
import { Moneda } from '../model/moneda.entity';
import { TipoCambio } from '../model/tipo-cambio.entity';
import { Transaccion } from '../model/transaccion.entity';
import { NotFoundException } from '@nestjs/common';

describe('TransactionsService', () => {
  let service: TransactionsService;
  let monedaRepository: Repository<Moneda>;
  let tipoCambioRepository: Repository<TipoCambio>;
  let transaccionRepository: Repository<Transaccion>;

  beforeEach(async () => {

    const mockDeleteSingleton = jest.fn().mockReturnThis();
    const mockExecuteSingleton = jest.fn().mockReturnThis();
    const mockFromSingleton = jest.fn().mockReturnThis();
    const mockGetManySingleton = jest.fn().mockReturnThis();
    const mockGetOneSingleton = jest.fn().mockReturnThis();
    const mockInnerJoinSingleton = jest.fn().mockReturnThis();
    const mockInnerJoinAndSelectSingleton = jest.fn().mockReturnThis();
    const mockOrderBySingleton = jest.fn().mockReturnThis();
    const mockWhereSingleton = jest.fn().mockReturnThis();
    const mockorWhereSingleton = jest.fn().mockReturnThis();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionsService,
        {
          provide: getRepositoryToken(Usuario),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Moneda),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(TipoCambio),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
            createQueryBuilder: () => ({
              delete: mockDeleteSingleton,
              execute: mockExecuteSingleton,
              from: mockFromSingleton,
              getMany: mockGetManySingleton,
              getOne: mockGetOneSingleton,
              innerJoin: mockInnerJoinSingleton,
              innerJoinAndSelect: mockInnerJoinAndSelectSingleton,
              orderBy: mockOrderBySingleton,
              where: mockWhereSingleton,
              orWhere: mockorWhereSingleton
            }),
          },
        },
        {
          provide: getRepositoryToken(Transaccion),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TransactionsService>(TransactionsService);
    monedaRepository = module.get<Repository<Moneda>>(getRepositoryToken(Moneda));
    tipoCambioRepository = module.get<Repository<TipoCambio>>(getRepositoryToken(TipoCambio));
    transaccionRepository = module.get<Repository<Transaccion>>(getRepositoryToken(Transaccion));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('monedaRepository should be defined', () => {
    expect(monedaRepository).toBeDefined();
  });

  it('tipoCambioRepository should be defined', () => {
    expect(tipoCambioRepository).toBeDefined();
  });

  it('transaccionRepository should be defined', () => {
    expect(transaccionRepository).toBeDefined();
  });

  it('should throw NotFoundException when Moneda does not exist', async () => {
    jest.spyOn(monedaRepository, 'findOne').mockResolvedValue(null);

    const tipoCambioRequestDto: TipoCambioRequestDto = {
      monedaOrigen: 'USD',
      monedaDestino: 'EUR',
      monto: 100,
      montoConvertido: 0,
      tipoCambioId: 0,
    };

    await expect(service.realizarTipoDeCambio(tipoCambioRequestDto)).rejects.toThrowError(
      NotFoundException,
    );
  });


  it('should perform a successful transaction', async () => {

    const tipoCambioRequestDto: TipoCambioRequestDto = {
      monedaOrigen: 'USD',
      monedaDestino: 'EUR',
      monto: 100,
      montoConvertido: 0,
      tipoCambioId: 0,
    };

    const monedaOrigenMock: Moneda = {
      id: 0,
      codigo: 'USD',
      nombre: 'DOLARES',
      tipoCambiosOrigen: [],
      tipoCambiosDestino: []
    };

    const monedaDestinoMock: Moneda = {
      id: 1,
      codigo: 'PEN',
      nombre: 'NUEVOS SOLES',
      tipoCambiosOrigen: [],
      tipoCambiosDestino: []
    };

    jest.spyOn(monedaRepository, 'findOne')
      .mockResolvedValueOnce(monedaOrigenMock)
      .mockResolvedValueOnce(monedaDestinoMock);

    const transaccionMock: Transaccion = {
      id: 1,
      monto: 10,
      montoConvertido: 100,
      tipoCambio: new TipoCambio,
      usuario: new Usuario,
      fecha: undefined,
      updateDates: function (): void {
        throw new Error('Function not implemented.');
      },
      tipoCambioId: '1',
      monedaOrigen: 'PEN',
      monedaDestino: 'USD',
      monedaDestinoM: new Moneda,
      monedaOrigenM: new Moneda
    };

    jest.spyOn(transaccionRepository, 'save').mockResolvedValue(transaccionMock);
    const result = await service.realizarTipoDeCambio(tipoCambioRequestDto);

    expect(result).toBeDefined();
    expect(transaccionRepository.save).toHaveBeenCalledWith(expect.any(Transaccion));
    expect(result).toEqual(new ApiResponse(1, 'Transaccion exitosa', expect.any(TransaccionDto)));

  });
});
