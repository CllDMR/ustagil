import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import {
  SuperAdminFindAllResponse,
  SuperAdminFindAllResponseBodyDto,
} from '@ustagil/api/core/account/typing';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SuperAdminFindAllTransformInterceptor
  implements
    NestInterceptor<
      SuperAdminFindAllResponse,
      SuperAdminFindAllResponseBodyDto
    >
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<SuperAdminFindAllResponse>
  ): Observable<SuperAdminFindAllResponseBodyDto> {
    return next.handle().pipe(
      map((data) => {
        const resBody: SuperAdminFindAllResponseBodyDto = {
          super_admins:
            data?.super_admins?.map((superAdmin) => ({
              id: superAdmin.id,
              role: superAdmin.role,
              displayName: superAdmin.displayName,
              email: superAdmin.email,
              organization: superAdmin.organization,
            })) ?? [],
          next_page_cursor: data.next_page_cursor,
        };

        return resBody;
      })
    );
  }
}
