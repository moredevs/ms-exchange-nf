import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiResponse } from 'src/transactions/dto/api-reponse.dto';

@Catch(HttpException)
export class ApiExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>(); 

    const status = exception.getStatus();
    const message = exception.message || 'Error interno del servidor';

     const apiResponse = new ApiResponse(0, message, null);

     response.status(status);
     response.send(apiResponse);
  }
}
