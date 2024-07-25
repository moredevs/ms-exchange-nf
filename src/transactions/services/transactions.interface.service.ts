import { ApiResponse } from "../dto/api-reponse.dto";
import { TipoCambioDto } from "../dto/tipo-cambio.dto";
import { TipoCambioRequestDto } from "../dto/tipo-cambio.request.dto";
import { TransaccionDto } from "../dto/transaction.dto";

export const TRANSACTION_SERVICE = 'TRANSACTION SERVICE';
export interface ITransactionService {
    registrarTipoDeCambio(tipoCambioRequestDto: TipoCambioRequestDto): Promise<ApiResponse<TipoCambioDto>>;
    realizarTipoDeCambio(tipoCambioRequestDto: TipoCambioRequestDto): Promise<ApiResponse<TransaccionDto>>;
  }