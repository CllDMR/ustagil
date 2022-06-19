import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import {
  SuperAdminDomain,
  SuperAdminUpdateOneResponseBodyDto,
} from '@ustagil/api/core/account/typing';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SuperAdminUpdateOneTransformInterceptor
  implements
    NestInterceptor<SuperAdminDomain, SuperAdminUpdateOneResponseBodyDto>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<SuperAdminDomain>
  ): Observable<SuperAdminUpdateOneResponseBodyDto> {
    return next.handle().pipe(
      map((data) => {
        const resBody: SuperAdminUpdateOneResponseBodyDto = {
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
