import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import {
  SuperAdminDeleteOneResponseBodyDto,
  SuperAdminDomain,
} from '@ustagil/api/core/account/typing';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SuperAdminDeleteOneTransformInterceptor
  implements
    NestInterceptor<SuperAdminDomain, SuperAdminDeleteOneResponseBodyDto>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<SuperAdminDomain>
  ): Observable<SuperAdminDeleteOneResponseBodyDto> {
    return next.handle().pipe(
      map((data) => {
        const resBody: SuperAdminDeleteOneResponseBodyDto = {
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
