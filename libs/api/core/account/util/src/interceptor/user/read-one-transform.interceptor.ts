import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import {
  AccountUserDomain,
  AccountUserReadOneResponseBodyDto,
} from '@ustagil/api/core/account/typing';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AccountUserReadOneTransformInterceptor
  implements
    NestInterceptor<AccountUserDomain, AccountUserReadOneResponseBodyDto>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<AccountUserDomain>
  ): Observable<AccountUserReadOneResponseBodyDto> {
    return next.handle().pipe(
      map((data) => {
        const resBody: AccountUserReadOneResponseBodyDto = {
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
