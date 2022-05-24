import { Catch, RpcExceptionFilter } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { CustomRpcException } from '../exceptions/custom-rpc.exception';

@Catch(CustomRpcException)
export class AllCustomRpcExceptionsFilter
  implements RpcExceptionFilter<CustomRpcException>
{
  catch(exception: CustomRpcException): Observable<unknown> {
    return throwError(() => Buffer.from(JSON.stringify(exception)));
  }
}
