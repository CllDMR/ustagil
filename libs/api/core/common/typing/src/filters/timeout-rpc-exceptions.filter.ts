import { Catch, HttpStatus, RpcExceptionFilter } from '@nestjs/common';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { CustomRpcException } from '../exceptions/custom-rpc.exception';

@Catch(TimeoutError)
export class TimeoutErrorRpcExceptionsFilter
  implements RpcExceptionFilter<TimeoutError>
{
  catch(exception: TimeoutError): Observable<unknown> {
    return throwError(() =>
      Buffer.from(
        JSON.stringify(
          new CustomRpcException({
            statusCode: HttpStatus.GATEWAY_TIMEOUT,
            errorCode: 'undefined for now',
            message: exception.message,
            description: 'Wake up developer',
          })
        )
      )
    );
  }
}
