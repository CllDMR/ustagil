import {
  CallHandler,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { MyRequest } from '@ustagil/api/core/common/typing';
import { Types } from 'mongoose';
import { Observable, tap } from 'rxjs';

export interface Response {
  account: Types.ObjectId;
}

@Injectable()
export class CheckUserAccessForbiddenToAccountInterceptor
  implements NestInterceptor<unknown, Response>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<Response> {
    const http = context.switchToHttp();
    const request = http.getRequest<MyRequest>();
    const user = request.user;
    const { accountId } = request.params;

    if (!accountId) throw new ForbiddenException();

    return next.handle().pipe(
      tap((res) => {
        // if (
        //   accountId &&
        //   (!(user.account_ids as string[]).includes(accountId) ||
        //     res.account.toHexString() !== accountId)
        // )
        //   throw new ForbiddenException();
        return res;
      })
    );
  }
}
