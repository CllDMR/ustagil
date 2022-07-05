import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import {
  AccountOrganizationReadAllResponse,
  AccountOrganizationReadAllResponseBodyDto,
} from '@ustagil/api/core/account/typing';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AccountOrganizationReadAllTransformInterceptor
  implements
    NestInterceptor<
      AccountOrganizationReadAllResponse,
      AccountOrganizationReadAllResponseBodyDto
    >
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<AccountOrganizationReadAllResponse>
  ): Observable<AccountOrganizationReadAllResponseBodyDto> {
    return next.handle().pipe(
      map((data) => {
        const resBody: AccountOrganizationReadAllResponseBodyDto = {
          organizations:
            data?.organizations?.map((organization) => ({
              id: organization.id,
              kind: organization.kind,
              role: organization.role,
              displayName: organization.displayName,
              email: organization.email,
              organization: organization.organization,
            })) ?? [],
          next_page_cursor: data.next_page_cursor,
        };

        return resBody;
      })
    );
  }
}
