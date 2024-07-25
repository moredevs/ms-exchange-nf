import { Body, ClassSerializerInterceptor, Controller, Inject, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ITransactionService, TRANSACTION_SERVICE } from '../services/transactions.interface.service';
import { TipoCambioRequestDto } from '../dto/tipo-cambio.request.dto';
import { ApiResponse } from '../dto/api-reponse.dto';
import { TipoCambioDto } from '../dto/tipo-cambio.dto';
import { TransaccionDto } from '../dto/transaction.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Transaccion')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('transaccion')
export class TransactionsController {
    constructor(@Inject(TRANSACTION_SERVICE)
    private readonly transactionService: ITransactionService) {
    }

    @ApiOkResponse({
        description: 'Registrar Tipo de Cambio',
        type: ApiResponse<TipoCambioDto>,
        isArray: false
      })
      @UseGuards(AuthGuard())
      @Post()
      createTipoCambio(@Body() tipoCambioRequestDto: TipoCambioRequestDto):Promise<ApiResponse<TipoCambioDto>> {
        return this.transactionService.registrarTipoDeCambio(tipoCambioRequestDto)
      }
    
      @ApiOkResponse({
        description: 'Realizar cambio de Tipo de Cambio',
        type: ApiResponse<TipoCambioDto>,
        isArray: false
      })
      @UseGuards(AuthGuard())
      @Post("/tipo-cambio")
      realizarCambio(@Body() tipoCambioRequestDto: TipoCambioRequestDto):Promise<ApiResponse<TransaccionDto>> {
        return this.transactionService.realizarTipoDeCambio(tipoCambioRequestDto)
      }
}
