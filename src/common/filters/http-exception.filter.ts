import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class CustomHttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionResponse: any = exception.getResponse();

    console.log('peguei >>>>>>>>>', exception);

    // Verifica se é um erro 400 e retorna uma mensagem padronizada
    if (exception instanceof BadRequestException) {
      return response.status(400).json({
        statusCode: 400,
        message: 'A bad request occurred. Please verify your input.',
        errorDetails: exceptionResponse.message || exceptionResponse,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    }

    // Verifica se é um erro 404 e retorna uma mensagem padronizada
    if (status === 404) {
      return response.status(404).json({
        statusCode: 404,
        message: exception?.message
          ? `${exception.message} not found`
          : 'Resource not found. Please check the URL.',
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    }

    // Verifica se é um erro 500 e retorna uma mensagem padronizada
    if (status === 500) {
      return response.status(500).json({
        statusCode: 500,
        message: 'Internal Server Error. Please try again later.',
        errorDetails:
          exceptionResponse?.message ||
          exceptionResponse ||
          'Internal Server Error.',
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    }

    // Tratamento para outras exceções
    return response.status(status).json({
      statusCode: status,
      message: exception.message || 'Unknown Error',
      errorDetails:
        exceptionResponse?.message || exceptionResponse || 'Unknown Error.',
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
