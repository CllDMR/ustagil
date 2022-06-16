import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import {
  AccountDeleteOneResponseBodyDto,
  AccountDomain,
} from '@ustagil/api/core/account/typing';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AccountDeleteOneTransformInterceptor
  implements NestInterceptor<AccountDomain, AccountDeleteOneResponseBodyDto>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<AccountDomain>
  ): Observable<AccountDeleteOneResponseBodyDto> {
    return next.handle().pipe(
      map((data) => {
        const resBody: AccountDeleteOneResponseBodyDto = {
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
