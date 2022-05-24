import { Catch, HttpStatus, RpcExceptionFilter } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { CustomRpcException } from '..';

@Catch()
export class AllRpcExceptionsFilter implements RpcExceptionFilter {
  catch(exception: Error): Observable<unknown> {
    return throwError(() =>
      Buffer.from(
        JSON.stringify(
          new CustomRpcException({
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            errorCode: 'undefined for now',
            message: exception.message,
            description: exception.name,
          })
        )
      )
    );
  }
}
