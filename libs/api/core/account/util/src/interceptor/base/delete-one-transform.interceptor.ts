import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import {
  AccountBaseDeleteOneResponseBodyDto,
  AccountBaseDomain,
} from '@ustagil/api/core/account/typing';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AccountBaseDeleteOneTransformInterceptor
  implements
    NestInterceptor<AccountBaseDomain, AccountBaseDeleteOneResponseBodyDto>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<AccountBaseDomain>
  ): Observable<AccountBaseDeleteOneResponseBodyDto> {
    return next.handle().pipe(
      map((data) => {
        const resBody: AccountBaseDeleteOneResponseBodyDto = {
          id: data.id,
          kind: data.kind,
          role: data.role,
          displayName: data.displayName,
          email: data.email,
        };

        return resBody;
      })
    );
  }
}
