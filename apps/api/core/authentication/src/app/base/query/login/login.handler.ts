import { EventPublisher, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { AuthenticationBaseDomain } from '@ustagil/api/core/authentication/typing';
import { JWTPayload } from '@ustagil/api/core/common/typing';
import { AuthenticationBaseLoginnedEvent } from '../../event';
import { AuthenticationBaseLoginQuery } from './login.query';

@QueryHandler(AuthenticationBaseLoginQuery)
export class AuthenticationBaseLoginHandler
  implements IQueryHandler<AuthenticationBaseLoginQuery>
{
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly jwtService: JwtService
  ) {}

  async execute({ dto }: AuthenticationBaseLoginQuery): Promise<{
    access_token: string;
  }> {
    const { id, role } = dto;

    const AuthenticationBaseMergedDomain =
      this.eventPublisher.mergeClassContext(AuthenticationBaseDomain);

    const authenticationBaseDomain = new AuthenticationBaseMergedDomain({
      id,
      role,
    });

    const payload: JWTPayload = {
      sub: id,
      role: authenticationBaseDomain.role,
    };

    authenticationBaseDomain.apply(
      new AuthenticationBaseLoginnedEvent(authenticationBaseDomain.id)
    );

    authenticationBaseDomain.commit();

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
