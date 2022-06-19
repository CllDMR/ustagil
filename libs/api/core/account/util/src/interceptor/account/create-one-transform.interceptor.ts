import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import {
  AccountCreateOneResponseBodyDto,
  AccountDomain,
} from '@ustagil/api/core/account/typing';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AccountCreateOneTransformInterceptor
  implements NestInterceptor<AccountDomain, AccountCreateOneResponseBodyDto>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<AccountDomain>
  ): Observable<AccountCreateOneResponseBodyDto> {
    return next.handle().pipe(
      map((data) => {
        const resBody: AccountCreateOneResponseBodyDto = {
          id: data.id,
          role: data.role,
          displayName: data.displayName,
          email: data.email,
          organization: data.organization,
        };

        return resBody;
      })
    );
  }
}
