import { EventPublisher, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { AuthenticationUserDomain } from '@ustagil/api/core/authentication/typing';
import { JWTPayload } from '@ustagil/api/core/common/typing';
import { AuthenticationUserLoginnedEvent } from '../../event';
import { AuthenticationUserLoginQuery } from './login.query';

@QueryHandler(AuthenticationUserLoginQuery)
export class AuthenticationUserLoginHandler
  implements IQueryHandler<AuthenticationUserLoginQuery>
{
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly jwtService: JwtService
  ) {}

  async execute({ dto }: AuthenticationUserLoginQuery): Promise<{
    access_token: string;
  }> {
    const { displayName, email, id, role } = dto;

    const AuthenticationUserMergedDomain =
      this.eventPublisher.mergeClassContext(AuthenticationUserDomain);

    const authenticationUserDomain = new AuthenticationUserMergedDomain({
      displayName,
      email,
      role,
    });

    const payload: JWTPayload = {
      sub: id,
      role: authenticationUserDomain.role,
    };

    authenticationUserDomain.apply(
      new AuthenticationUserLoginnedEvent(
        authenticationUserDomain.displayName,
        authenticationUserDomain.email
      )
    );

    authenticationUserDomain.commit();

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
