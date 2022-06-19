import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import {
  OrganizationDeleteOneResponseBodyDto,
  OrganizationDomain,
} from '@ustagil/api/core/account/typing';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class OrganizationDeleteOneTransformInterceptor
  implements
    NestInterceptor<OrganizationDomain, OrganizationDeleteOneResponseBodyDto>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<OrganizationDomain>
  ): Observable<OrganizationDeleteOneResponseBodyDto> {
    return next.handle().pipe(
      map((data) => {
        const resBody: OrganizationDeleteOneResponseBodyDto = {
          id: data.id,
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
