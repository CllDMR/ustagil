import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import {
  UserDomain,
  UserUpdateOneResponseBodyDto,
} from '@ustagil/api/core/account/typing';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class UserUpdateOneTransformInterceptor
  implements NestInterceptor<UserDomain, UserUpdateOneResponseBodyDto>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<UserDomain>
  ): Observable<UserUpdateOneResponseBodyDto> {
    return next.handle().pipe(
      map((data) => {
        const resBody: UserUpdateOneResponseBodyDto = {
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
