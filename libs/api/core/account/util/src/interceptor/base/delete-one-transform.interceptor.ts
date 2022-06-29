import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import {
  BaseDeleteOneResponseBodyDto,
  BaseDomain,
} from '@ustagil/api/core/account/typing';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class BaseDeleteOneTransformInterceptor
  implements NestInterceptor<BaseDomain, BaseDeleteOneResponseBodyDto>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<BaseDomain>
  ): Observable<BaseDeleteOneResponseBodyDto> {
    return next.handle().pipe(
      map((data) => {
        const resBody: BaseDeleteOneResponseBodyDto = {
          id: data.id,
          role: data.role,
          displayName: data.displayName,
          email: data.email,
          organization: data.organization,
        };

        return resBody;
      })
    );
  }
}
