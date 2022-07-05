import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import {
  AccountSuperAdminReadAllResponse,
  AccountSuperAdminReadAllResponseBodyDto,
} from '@ustagil/api/core/account/typing';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AccountSuperAdminReadAllTransformInterceptor
  implements
    NestInterceptor<
      AccountSuperAdminReadAllResponse,
      AccountSuperAdminReadAllResponseBodyDto
    >
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<AccountSuperAdminReadAllResponse>
  ): Observable<AccountSuperAdminReadAllResponseBodyDto> {
    return next.handle().pipe(
      map((data) => {
        const resBody: AccountSuperAdminReadAllResponseBodyDto = {
          super_admins:
            data?.super_admins?.map((superAdmin) => ({
              id: superAdmin.id,
              kind: superAdmin.kind,
              role: superAdmin.role,
              displayName: superAdmin.displayName,
              email: superAdmin.email,
            })) ?? [],
          next_page_cursor: data.next_page_cursor,
        };

        return resBody;
      })
    );
  }
}
