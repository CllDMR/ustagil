import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import {
  AuthenticationSuperAdminDomain,
  AuthenticationSuperAdminRegisterResponseBodyDto,
} from '@ustagil/api/core/authentication/typing';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthenticationSuperAdminRegisterTransformInterceptor
  implements
    NestInterceptor<
      AuthenticationSuperAdminDomain,
      AuthenticationSuperAdminRegisterResponseBodyDto
    >
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<AuthenticationSuperAdminDomain>
  ): Observable<AuthenticationSuperAdminRegisterResponseBodyDto> {
    return next.handle().pipe(
      map((data) => {
        const resBody: AuthenticationSuperAdminRegisterResponseBodyDto = {
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
