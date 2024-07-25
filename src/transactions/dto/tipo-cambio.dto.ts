import { ApiProperty } from "@nestjs/swagger";

export class TipoCambioDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    monedaOrigen: string;
    @ApiProperty()
    monedaDestino: string;
    @ApiProperty()
    valor: number;
    @ApiProperty()
    fecha:string;
}