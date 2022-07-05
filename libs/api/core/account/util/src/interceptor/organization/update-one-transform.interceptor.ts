import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import {
  AccountOrganizationDomain,
  AccountOrganizationUpdateOneResponseBodyDto,
} from '@ustagil/api/core/account/typing';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AccountOrganizationUpdateOneTransformInterceptor
  implements
    NestInterceptor<
      AccountOrganizationDomain,
      AccountOrganizationUpdateOneResponseBodyDto
    >
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<AccountOrganizationDomain>
  ): Observable<AccountOrganizationUpdateOneResponseBodyDto> {
    return next.handle().pipe(
      map((data) => {
        const resBody: AccountOrganizationUpdateOneResponseBodyDto = {
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
