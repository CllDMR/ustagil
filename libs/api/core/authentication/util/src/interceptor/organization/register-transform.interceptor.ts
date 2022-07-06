import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import {
  AuthenticationOrganizationDomain,
  AuthenticationOrganizationRegisterResponseBodyDto,
} from '@ustagil/api/core/authentication/typing';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthenticationOrganizationRegisterTransformInterceptor
  implements
    NestInterceptor<
      AuthenticationOrganizationDomain,
      AuthenticationOrganizationRegisterResponseBodyDto
    >
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<AuthenticationOrganizationDomain>
  ): Observable<AuthenticationOrganizationRegisterResponseBodyDto> {
    return next.handle().pipe(
      map((data) => {
        const resBody: AuthenticationOrganizationRegisterResponseBodyDto = {
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
