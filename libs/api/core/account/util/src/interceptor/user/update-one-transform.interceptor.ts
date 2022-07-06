import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import {
  AccountUserDomain,
  AccountUserUpdateOneResponseBodyDto,
} from '@ustagil/api/core/account/typing';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AccountUserUpdateOneTransformInterceptor
  implements
    NestInterceptor<AccountUserDomain, AccountUserUpdateOneResponseBodyDto>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<AccountUserDomain>
  ): Observable<AccountUserUpdateOneResponseBodyDto> {
    return next.handle().pipe(
      map((data) => {
        const resBody: AccountUserUpdateOneResponseBodyDto = {
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
