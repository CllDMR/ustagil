import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import {
  isCustomRpcError,
  isCustomRpcException,
} from '../exceptions/custom-rpc.exception';

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
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    let statusCode: ResponseBody['statusCode'] = null,
      description: ResponseBody['description'] = null,
      errorCode: ResponseBody['errorCode'] = null,
      message: ResponseBody['message'] = null;

    const timestamp: ResponseBody['timestamp'] = new Date().toISOString(),
      path: ResponseBody['path'] = httpAdapter.getRequestUrl(ctx.getRequest());

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      message = exception.message;
    } else if (isCustomRpcException(exception)) {
      const error = JSON.parse(exception.details);

      if (isCustomRpcError(error)) {
        message = error.message;
        description = error.description;
        errorCode = error.errorCode;
        statusCode = error.statusCode;
      }
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
