import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import {
  OrganizationCreateOneResponseBodyDto,
  OrganizationDomain,
} from '@ustagil/api/core/account/typing';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class OrganizationCreateOneTransformInterceptor
  implements
    NestInterceptor<OrganizationDomain, OrganizationCreateOneResponseBodyDto>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<OrganizationDomain>
  ): Observable<OrganizationCreateOneResponseBodyDto> {
    return next.handle().pipe(
      map((data) => {
        const resBody: OrganizationCreateOneResponseBodyDto = {
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
