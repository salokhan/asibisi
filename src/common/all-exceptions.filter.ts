
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) { }

  catch(exception: unknown, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    let httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let responseBody;

    if (exception && exception['code']) {
      // if it is the db exception
      if (exception && (exception['code'] == '23505' || exception['code'] == '23502')) {
        responseBody = {
          statusCode: httpStatus,
          timestamp: new Date().toISOString(),
          path: httpAdapter.getRequestUrl(ctx.getRequest()),
          detail: exception['detail']
        };
      } else if (exception && exception['code'] == '22P02') {
        responseBody = {
          statusCode: httpStatus,
          timestamp: new Date().toISOString(),
          path: httpAdapter.getRequestUrl(ctx.getRequest()),
          detail: exception['message']
        };
      }

    } else if (exception['response'] && exception['response'].detail) {
      responseBody = {
        statusCode: httpStatus,
        timestamp: new Date().toISOString(),
        path: httpAdapter.getRequestUrl(ctx.getRequest()),
        detail: exception['response'].detail
      };
    } else if (exception && exception['name'] && exception['name'] == 'EntityNotFoundError'){
      httpStatus = HttpStatus.NOT_FOUND
      responseBody = {
        statusCode: 404,
        timestamp: new Date().toISOString(),
        path: httpAdapter.getRequestUrl(ctx.getRequest()),
        detail: 'Record not found with the given id'
      };
    }
     else {
      responseBody = {
        statusCode: httpStatus,
        timestamp: new Date().toISOString(),
        path: httpAdapter.getRequestUrl(ctx.getRequest()),
        detail: exception['detail']
      };
    }


    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
