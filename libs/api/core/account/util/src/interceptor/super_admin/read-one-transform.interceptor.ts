import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import {
  AccountSuperAdminDomain,
  AccountSuperAdminReadOneResponseBodyDto,
} from '@ustagil/api/core/account/typing';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AccountSuperAdminReadOneTransformInterceptor
  implements
    NestInterceptor<
      AccountSuperAdminDomain,
      AccountSuperAdminReadOneResponseBodyDto
    >
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<AccountSuperAdminDomain>
  ): Observable<AccountSuperAdminReadOneResponseBodyDto> {
    return next.handle().pipe(
      map((data) => {
        const resBody: AccountSuperAdminReadOneResponseBodyDto = {
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
