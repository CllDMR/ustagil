import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import {
  OrganizationDomain,
  OrganizationFindOneResponseBodyDto,
} from '@ustagil/api/core/account/typing';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class OrganizationFindOneTransformInterceptor
  implements
    NestInterceptor<OrganizationDomain, OrganizationFindOneResponseBodyDto>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<OrganizationDomain>
  ): Observable<OrganizationFindOneResponseBodyDto> {
    return next.handle().pipe(
      map((data) => {
        const resBody: OrganizationFindOneResponseBodyDto = {
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
