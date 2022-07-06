import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import {
  AccountBaseFindAllResponseBodyDto,
  AccountBaseReadAllResponse,
} from '@ustagil/api/core/account/typing';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AccountBaseReadAllTransformInterceptor
  implements
    NestInterceptor<
      AccountBaseReadAllResponse,
      AccountBaseFindAllResponseBodyDto
    >
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<AccountBaseReadAllResponse>
  ): Observable<AccountBaseFindAllResponseBodyDto> {
    return next.handle().pipe(
      map((data) => {
        const resBody: AccountBaseFindAllResponseBodyDto = {
          bases:
            data?.bases?.map((base) => ({
              id: base.id,
              kind: base.kind,
              role: base.role,
              displayName: base.displayName,
              email: base.email,
            })) ?? [],
          next_page_cursor: data.next_page_cursor,
        };

        return resBody;
      })
    );
  }
}
