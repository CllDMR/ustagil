import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import {
  UserCreateOneResponseBodyDto,
  UserDomain,
} from '@ustagil/api/core/account/typing';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class UserCreateOneTransformInterceptor
  implements NestInterceptor<UserDomain, UserCreateOneResponseBodyDto>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<UserDomain>
  ): Observable<UserCreateOneResponseBodyDto> {
    return next.handle().pipe(
      map((data) => {
        const resBody: UserCreateOneResponseBodyDto = {
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
