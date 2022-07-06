import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import {
  AccountUserCreateOneResponseBodyDto,
  AccountUserDomain,
} from '@ustagil/api/core/account/typing';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AccountUserCreateOneTransformInterceptor
  implements
    NestInterceptor<AccountUserDomain, AccountUserCreateOneResponseBodyDto>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<AccountUserDomain>
  ): Observable<AccountUserCreateOneResponseBodyDto> {
    return next.handle().pipe(
      map((data) => {
        const resBody: AccountUserCreateOneResponseBodyDto = {
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
