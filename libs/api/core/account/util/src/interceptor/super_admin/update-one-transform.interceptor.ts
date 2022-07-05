import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import {
  AccountSuperAdminDomain,
  AccountSuperAdminUpdateOneResponseBodyDto,
} from '@ustagil/api/core/account/typing';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AccountSuperAdminUpdateOneTransformInterceptor
  implements
    NestInterceptor<
      AccountSuperAdminDomain,
      AccountSuperAdminUpdateOneResponseBodyDto
    >
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<AccountSuperAdminDomain>
  ): Observable<AccountSuperAdminUpdateOneResponseBodyDto> {
    return next.handle().pipe(
      map((data) => {
        const resBody: AccountSuperAdminUpdateOneResponseBodyDto = {
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
