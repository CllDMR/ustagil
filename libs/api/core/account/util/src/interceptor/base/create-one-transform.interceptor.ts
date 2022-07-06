import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import {
  AccountBaseCreateOneResponseBodyDto,
  AccountBaseDomain,
} from '@ustagil/api/core/account/typing';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AccountBaseCreateOneTransformInterceptor
  implements
    NestInterceptor<AccountBaseDomain, AccountBaseCreateOneResponseBodyDto>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<AccountBaseDomain>
  ): Observable<AccountBaseCreateOneResponseBodyDto> {
    return next.handle().pipe(
      map((data) => {
        const resBody: AccountBaseCreateOneResponseBodyDto = {
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
