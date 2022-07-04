import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import {
  OrganizationFindAllResponse,
  OrganizationFindAllResponseBodyDto,
} from '@ustagil/api/core/account/typing';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class OrganizationFindAllTransformInterceptor
  implements
    NestInterceptor<
      OrganizationFindAllResponse,
      OrganizationFindAllResponseBodyDto
    >
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<OrganizationFindAllResponse>
  ): Observable<OrganizationFindAllResponseBodyDto> {
    return next.handle().pipe(
      map((data) => {
        const resBody: OrganizationFindAllResponseBodyDto = {
          organizations:
            data?.organizations?.map((organization) => ({
              id: organization.id,
              kind: organization.kind,
              role: organization.role,
              displayName: organization.displayName,
              email: organization.email,
              organization: organization.organization,
            })) ?? [],
          next_page_cursor: data.next_page_cursor,
        };

        return resBody;
      })
    );
  }
}
