import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import {
  AccountSuperAdminDeleteOneResponseBodyDto,
  AccountSuperAdminDomain,
} from '@ustagil/api/core/account/typing';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AccountSuperAdminDeleteOneTransformInterceptor
  implements
    NestInterceptor<
      AccountSuperAdminDomain,
      AccountSuperAdminDeleteOneResponseBodyDto
    >
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<AccountSuperAdminDomain>
  ): Observable<AccountSuperAdminDeleteOneResponseBodyDto> {
    return next.handle().pipe(
      map((data) => {
        const resBody: AccountSuperAdminDeleteOneResponseBodyDto = {
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
