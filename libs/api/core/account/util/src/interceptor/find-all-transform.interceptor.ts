import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import {
  AccountFindAllResponse,
  AccountFindAllResponseBodyDto,
} from '@ustagil/api/core/account/typing';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AccountFindAllTransformInterceptor
  implements
    NestInterceptor<AccountFindAllResponse, AccountFindAllResponseBodyDto>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<AccountFindAllResponse>
  ): Observable<AccountFindAllResponseBodyDto> {
    return next.handle().pipe(
      map((data) => {
        const resBody: AccountFindAllResponseBodyDto = {
          accounts: data.accounts.map((account) => ({
            id: account.id,
            role: account.role,
            displayName: account.displayName,
            email: account.email,
            organization: account.organization,
          })),
          next_page_cursor: data.next_page_cursor,
        };

        return resBody;
      })
    );
  }
}
