import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import {
  AccountBaseDomain,
  AccountBaseUpdateOneResponseBodyDto,
} from '@ustagil/api/core/account/typing';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AccountBaseUpdateOneTransformInterceptor
  implements
    NestInterceptor<AccountBaseDomain, AccountBaseUpdateOneResponseBodyDto>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<AccountBaseDomain>
  ): Observable<AccountBaseUpdateOneResponseBodyDto> {
    return next.handle().pipe(
      map((data) => {
        const resBody: AccountBaseUpdateOneResponseBodyDto = {
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
