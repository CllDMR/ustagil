import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import {
  AuthenticationBaseDomain,
  AuthenticationBaseRegisterResponseBodyDto,
} from '@ustagil/api/core/authentication/typing';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthenticationBaseRegisterTransformInterceptor
  implements
    NestInterceptor<
      AuthenticationBaseDomain,
      AuthenticationBaseRegisterResponseBodyDto
    >
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<AuthenticationBaseDomain>
  ): Observable<AuthenticationBaseRegisterResponseBodyDto> {
    return next.handle().pipe(
      map((data) => {
        const resBody: AuthenticationBaseRegisterResponseBodyDto = {
          id: data.id,
          role: data.role,
          displayName: data.displayName,
          email: data.email,
        };

        return resBody;
      })
    );
  }
}
