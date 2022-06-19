import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import {
  UserDomain,
  UserFindOneResponseBodyDto,
} from '@ustagil/api/core/account/typing';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class UserFindOneTransformInterceptor
  implements NestInterceptor<UserDomain, UserFindOneResponseBodyDto>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<UserDomain>
  ): Observable<UserFindOneResponseBodyDto> {
    return next.handle().pipe(
      map((data) => {
        const resBody: UserFindOneResponseBodyDto = {
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
