import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsController } from './transactions.controller';
import { ITransactionService, TRANSACTION_SERVICE } from '../services/transactions.interface.service';
import { TipoCambioRequestDto } from '../dto/tipo-cambio.request.dto';
import { TransaccionDto } from '../dto/transaction.dto';
import { ApiResponse } from '../dto/api-reponse.dto';
import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext } from '@nestjs/common';

describe('TransactionsController', () => {
  let controller: TransactionsController;
  let transactionService: ITransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionsController],
      providers: [
        {
          provide: TRANSACTION_SERVICE,
          useValue: {
            realizarTipoDeCambio: jest.fn(),
          },
        },
      ],
    })
    .overrideGuard(AuthGuard())
    .useValue({
      canActivate: (context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();
         request.user = {};
        return true; 
      },
    })
    .compile();

    controller = module.get<TransactionsController>(TransactionsController);
    transactionService = module.get<ITransactionService>(TRANSACTION_SERVICE);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('realizarCambio', () => {
    it('should call transactionService.realizarTipoDeCambio with the correct parameters', async () => {
      const tipoCambioRequestDto: TipoCambioRequestDto = {
        monedaOrigen: 'PEN',
        monedaDestino: 'USD',
        monto: 10,
        montoConvertido: 100,
        tipoCambioId: 1,
      };

      const expectedResult: ApiResponse<TransaccionDto> = {
        code: 1,
        message: 'OK',
        data: undefined
      };

      jest.spyOn(transactionService, 'realizarTipoDeCambio').mockResolvedValue(expectedResult);
      const result = await controller.realizarCambio(tipoCambioRequestDto);
      expect(transactionService.realizarTipoDeCambio).toHaveBeenCalledWith(tipoCambioRequestDto);
      expect(result).toBe(expectedResult);
    });
  });
});
