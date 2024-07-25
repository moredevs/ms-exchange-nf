import { ApiProperty } from "@nestjs/swagger";
import { Transaccion } from "../model/transaccion.entity";

export class TransaccionDto {
        @ApiProperty()
        monto: number;
        @ApiProperty()
        montoTipoCambio: number;
        @ApiProperty()
        tipoCambio: number;
        @ApiProperty()
        monedaOrigen: string;
        @ApiProperty()
        monedaDestino: string;
        @ApiProperty()
        fechaTransaccion: string

        constructor(partial: Partial<Transaccion>, tipoCambio:number) {
                this.monto = partial.monto
                this.montoTipoCambio = partial.montoConvertido
                this.monedaOrigen= partial.monedaOrigen
                this.monedaDestino= partial.monedaDestino
                this.tipoCambio=+tipoCambio
        }
}