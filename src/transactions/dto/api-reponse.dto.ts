import { ApiProperty } from "@nestjs/swagger";

export class ApiResponse<T> {
    @ApiProperty()
    code: number;
    @ApiProperty()
    message: string;
    @ApiProperty()
    data: T;
  
    constructor(code: number, message: string, data: T) {
      this.code = code;
      this.message = message;
      this.data = data;
    }
  }
  