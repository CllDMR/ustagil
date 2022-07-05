import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import {
  AccountOrganizationDomain,
  AccountOrganizationReadOneResponseBodyDto,
} from '@ustagil/api/core/account/typing';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AccountOrganizationReadOneTransformInterceptor
  implements
    NestInterceptor<
      AccountOrganizationDomain,
      AccountOrganizationReadOneResponseBodyDto
    >
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<AccountOrganizationDomain>
  ): Observable<AccountOrganizationReadOneResponseBodyDto> {
    return next.handle().pipe(
      map((data) => {
        const resBody: AccountOrganizationReadOneResponseBodyDto = {
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
