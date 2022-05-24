import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { TimeoutError } from 'rxjs';

@Catch(TimeoutError)
export class TimeoutErrorExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(error: TimeoutError, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    const timestamp = new Date().toISOString(),
      statusCode = HttpStatus.REQUEST_TIMEOUT,
      path = httpAdapter.getRequestUrl(ctx.getRequest());

    const responseBody = {
      statusCode,
      timestamp,
      path,
      errorCode: 'undefined for now',
      message: 'Timeout.',
      description: 'Wake up developer',
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, statusCode);
  }
}
