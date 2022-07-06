import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import {
  AccountBaseDomain,
  AccountBaseFindOneResponseBodyDto,
} from '@ustagil/api/core/account/typing';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AccountBaseReadOneTransformInterceptor
  implements
    NestInterceptor<AccountBaseDomain, AccountBaseFindOneResponseBodyDto>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<AccountBaseDomain>
  ): Observable<AccountBaseFindOneResponseBodyDto> {
    return next.handle().pipe(
      map((data) => {
        const resBody: AccountBaseFindOneResponseBodyDto = {
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
