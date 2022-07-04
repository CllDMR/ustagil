import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import {
  AuthenticationDomain,
  RegisterResponseBodyDto,
} from '@ustagil/api/core/authentication/typing';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class RegisterTransformInterceptor
  implements NestInterceptor<AuthenticationDomain, RegisterResponseBodyDto>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<AuthenticationDomain>
  ): Observable<RegisterResponseBodyDto> {
    return next.handle().pipe(
      map((data) => {
        const resBody: RegisterResponseBodyDto = {
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
