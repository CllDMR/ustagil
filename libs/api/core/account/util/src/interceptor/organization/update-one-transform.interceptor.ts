import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import {
  OrganizationDomain,
  OrganizationUpdateOneResponseBodyDto,
} from '@ustagil/api/core/account/typing';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class OrganizationUpdateOneTransformInterceptor
  implements
    NestInterceptor<OrganizationDomain, OrganizationUpdateOneResponseBodyDto>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<OrganizationDomain>
  ): Observable<OrganizationUpdateOneResponseBodyDto> {
    return next.handle().pipe(
      map((data) => {
        const resBody: OrganizationUpdateOneResponseBodyDto = {
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
