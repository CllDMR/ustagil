import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { isICustomRpcException } from '@ustagil/api/core/common/typing';

interface ResponseBody {
  timestamp: string;
  statusCode: number;
  path: string;
  message: string;
  errorCode: string;
  description: string;
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: Record<string, unknown>, host: ArgumentsHost): void {
    let error = null;

    if ('error' in exception) {
      error = exception.error;
    } else {
      error = exception;
    }

    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    let statusCode: ResponseBody['statusCode'] = null,
      description: ResponseBody['description'] = null,
      errorCode: ResponseBody['errorCode'] = null,
      message: ResponseBody['message'] = null;

    const timestamp: ResponseBody['timestamp'] = new Date().toISOString(),
      path: ResponseBody['path'] = httpAdapter.getRequestUrl(ctx.getRequest());

    if (error instanceof HttpException) {
      statusCode = error.getStatus();
      message = error.message;
    } else if (isICustomRpcException(error) && error.rpcError) {
      message = error.message;
      description = error.description;
      errorCode = error.errorCode;
      statusCode = error.statusCode;
    } else {
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    const responseBody: ResponseBody = {
      statusCode,
      timestamp,
      path,
      message,
      errorCode,
      description,
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, statusCode);
  }
}
