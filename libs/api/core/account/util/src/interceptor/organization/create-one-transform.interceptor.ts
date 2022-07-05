import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import {
  AccountOrganizationCreateOneResponseBodyDto,
  AccountOrganizationDomain,
} from '@ustagil/api/core/account/typing';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AccountOrganizationCreateOneTransformInterceptor
  implements
    NestInterceptor<
      AccountOrganizationDomain,
      AccountOrganizationCreateOneResponseBodyDto
    >
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<AccountOrganizationDomain>
  ): Observable<AccountOrganizationCreateOneResponseBodyDto> {
    return next.handle().pipe(
      map((data) => {
        const resBody: AccountOrganizationCreateOneResponseBodyDto = {
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
