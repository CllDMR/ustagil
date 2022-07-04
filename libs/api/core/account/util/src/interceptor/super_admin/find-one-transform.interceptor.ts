import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import {
  SuperAdminDomain,
  SuperAdminFindOneResponseBodyDto,
} from '@ustagil/api/core/account/typing';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SuperAdminFindOneTransformInterceptor
  implements
    NestInterceptor<SuperAdminDomain, SuperAdminFindOneResponseBodyDto>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<SuperAdminDomain>
  ): Observable<SuperAdminFindOneResponseBodyDto> {
    return next.handle().pipe(
      map((data) => {
        const resBody: SuperAdminFindOneResponseBodyDto = {
          id: data.id,
          kind: data.kind,
          role: data.role,
          displayName: data.displayName,
          email: data.email,
        };

        return resBody;
      })
    );
  }
}
