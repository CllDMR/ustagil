import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import {
  AccountUserReadAllResponse,
  AccountUserReadAllResponseBodyDto,
} from '@ustagil/api/core/account/typing';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AccountUserReadAllTransformInterceptor
  implements
    NestInterceptor<
      AccountUserReadAllResponse,
      AccountUserReadAllResponseBodyDto
    >
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<AccountUserReadAllResponse>
  ): Observable<AccountUserReadAllResponseBodyDto> {
    return next.handle().pipe(
      map((data) => {
        const resBody: AccountUserReadAllResponseBodyDto = {
          users:
            data?.users?.map((user) => ({
              id: user.id,
              kind: user.kind,
              role: user.role,
              displayName: user.displayName,
              email: user.email,
            })) ?? [],
          next_page_cursor: data.next_page_cursor,
        };

        return resBody;
      })
    );
  }
}
