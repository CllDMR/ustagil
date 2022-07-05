import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import {
  AccountSuperAdminCreateOneResponseBodyDto,
  AccountSuperAdminDomain,
} from '@ustagil/api/core/account/typing';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AccountSuperAdminCreateOneTransformInterceptor
  implements
    NestInterceptor<
      AccountSuperAdminDomain,
      AccountSuperAdminCreateOneResponseBodyDto
    >
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<AccountSuperAdminDomain>
  ): Observable<AccountSuperAdminCreateOneResponseBodyDto> {
    return next.handle().pipe(
      map((data) => {
        const resBody: AccountSuperAdminCreateOneResponseBodyDto = {
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
