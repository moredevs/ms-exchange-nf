import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class TipoCambioRequestDto {
    @ApiProperty()
    @IsNotEmpty()
    monedaOrigen: string;
    @ApiProperty()
    @IsNotEmpty()
    monedaDestino: string;
    @ApiProperty()
    @IsNotEmpty()
    monto: number;
    montoConvertido: number;
    tipoCambioId: number;
}