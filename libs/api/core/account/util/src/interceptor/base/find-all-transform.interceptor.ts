import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import {
  BaseFindAllResponse,
  BaseFindAllResponseBodyDto,
} from '@ustagil/api/core/account/typing';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class BaseFindAllTransformInterceptor
  implements NestInterceptor<BaseFindAllResponse, BaseFindAllResponseBodyDto>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<BaseFindAllResponse>
  ): Observable<BaseFindAllResponseBodyDto> {
    return next.handle().pipe(
      map((data) => {
        const resBody: BaseFindAllResponseBodyDto = {
          bases:
            data?.bases?.map((base) => ({
              id: base.id,
              role: base.role,
              displayName: base.displayName,
              email: base.email,
              organization: base.organization,
            })) ?? [],
          next_page_cursor: data.next_page_cursor,
        };

        return resBody;
      })
    );
  }
}
