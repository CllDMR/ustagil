import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import {
  BaseDomain,
  BaseFindOneResponseBodyDto,
} from '@ustagil/api/core/account/typing';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class BaseFindOneTransformInterceptor
  implements NestInterceptor<BaseDomain, BaseFindOneResponseBodyDto>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<BaseDomain>
  ): Observable<BaseFindOneResponseBodyDto> {
    return next.handle().pipe(
      map((data) => {
        const resBody: BaseFindOneResponseBodyDto = {
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
