import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response, Request } from 'express';

@Catch(HttpException)
export class ApiExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : 500;

    const errorResponse =
      exception instanceof HttpException
        ? exception.getResponse()
        : exception?.message || 'Erro interno no servidor';

    console.log('Passando pelo filtro de exceção');

    response.status(status).json({
      statusCode: status,
      
      message: errorResponse,
    });
  }
}

