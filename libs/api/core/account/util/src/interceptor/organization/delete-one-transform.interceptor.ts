import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import {
  AccountOrganizationDeleteOneResponseBodyDto,
  AccountOrganizationDomain,
} from '@ustagil/api/core/account/typing';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AccountOrganizationDeleteOneTransformInterceptor
  implements
    NestInterceptor<
      AccountOrganizationDomain,
      AccountOrganizationDeleteOneResponseBodyDto
    >
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<AccountOrganizationDomain>
  ): Observable<AccountOrganizationDeleteOneResponseBodyDto> {
    return next.handle().pipe(
      map((data) => {
        const resBody: AccountOrganizationDeleteOneResponseBodyDto = {
          id: data.id,
          kind: data.kind,
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
