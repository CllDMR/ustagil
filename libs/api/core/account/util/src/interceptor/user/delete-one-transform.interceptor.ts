import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import {
  UserDeleteOneResponseBodyDto,
  UserDomain,
} from '@ustagil/api/core/account/typing';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class UserDeleteOneTransformInterceptor
  implements NestInterceptor<UserDomain, UserDeleteOneResponseBodyDto>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<UserDomain>
  ): Observable<UserDeleteOneResponseBodyDto> {
    return next.handle().pipe(
      map((data) => {
        const resBody: UserDeleteOneResponseBodyDto = {
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
