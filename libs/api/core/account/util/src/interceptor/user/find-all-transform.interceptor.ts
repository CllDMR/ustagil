import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import {
  UserFindAllResponse,
  UserFindAllResponseBodyDto,
} from '@ustagil/api/core/account/typing';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class UserFindAllTransformInterceptor
  implements NestInterceptor<UserFindAllResponse, UserFindAllResponseBodyDto>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<UserFindAllResponse>
  ): Observable<UserFindAllResponseBodyDto> {
    return next.handle().pipe(
      map((data) => {
        const resBody: UserFindAllResponseBodyDto = {
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
