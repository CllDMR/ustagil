import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import {
  SuperAdminCreateOneResponseBodyDto,
  SuperAdminDomain,
} from '@ustagil/api/core/account/typing';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SuperAdminCreateOneTransformInterceptor
  implements
    NestInterceptor<SuperAdminDomain, SuperAdminCreateOneResponseBodyDto>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<SuperAdminDomain>
  ): Observable<SuperAdminCreateOneResponseBodyDto> {
    return next.handle().pipe(
      map((data) => {
        const resBody: SuperAdminCreateOneResponseBodyDto = {
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
