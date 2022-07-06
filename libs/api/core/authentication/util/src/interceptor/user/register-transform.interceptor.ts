import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import {
  AuthenticationUserDomain,
  AuthenticationUserRegisterResponseBodyDto,
} from '@ustagil/api/core/authentication/typing';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthenticationUserRegisterTransformInterceptor
  implements
    NestInterceptor<
      AuthenticationUserDomain,
      AuthenticationUserRegisterResponseBodyDto
    >
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<AuthenticationUserDomain>
  ): Observable<AuthenticationUserRegisterResponseBodyDto> {
    return next.handle().pipe(
      map((data) => {
        const resBody: AuthenticationUserRegisterResponseBodyDto = {
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
