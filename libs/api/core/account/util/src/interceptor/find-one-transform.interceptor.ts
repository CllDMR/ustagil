import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import {
  AccountDomain,
  AccountFindOneResponseBodyDto,
} from '@ustagil/api/core/account/typing';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AccountFindOneTransformInterceptor
  implements NestInterceptor<AccountDomain, AccountFindOneResponseBodyDto>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<AccountDomain>
  ): Observable<AccountFindOneResponseBodyDto> {
    return next.handle().pipe(
      map((data) => {
        const resBody: AccountFindOneResponseBodyDto = {
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
