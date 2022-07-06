import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import {
  AccountUserDeleteOneResponseBodyDto,
  AccountUserDomain,
} from '@ustagil/api/core/account/typing';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AccountUserDeleteOneTransformInterceptor
  implements
    NestInterceptor<AccountUserDomain, AccountUserDeleteOneResponseBodyDto>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<AccountUserDomain>
  ): Observable<AccountUserDeleteOneResponseBodyDto> {
    return next.handle().pipe(
      map((data) => {
        const resBody: AccountUserDeleteOneResponseBodyDto = {
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
