import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import {
  BaseCreateOneResponseBodyDto,
  BaseDomain,
} from '@ustagil/api/core/account/typing';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class BaseCreateOneTransformInterceptor
  implements NestInterceptor<BaseDomain, BaseCreateOneResponseBodyDto>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<BaseDomain>
  ): Observable<BaseCreateOneResponseBodyDto> {
    return next.handle().pipe(
      map((data) => {
        const resBody: BaseCreateOneResponseBodyDto = {
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
