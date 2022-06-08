import { EventPublisher, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { AuthenticationDomain } from '@ustagil/api/core/authentication/typing';
import { AuthenticationLoginnedAccountEvent } from '../../event';
import { AuthenticationLoginAccountQuery } from './authentication-login-account.query';

@QueryHandler(AuthenticationLoginAccountQuery)
export class AuthenticationLoginAccountHandler
  implements IQueryHandler<AuthenticationLoginAccountQuery>
{
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly jwtService: JwtService
  ) {}

  async execute({ dto }: AuthenticationLoginAccountQuery) {
    const { email, displayName, id } = dto;

    const Authentication =
      this.eventPublisher.mergeClassContext(AuthenticationDomain);

    const authenticationDomain = new Authentication({
      email,
      displayName,
    });

    const payload = {
      sub: id,
      email: authenticationDomain.email,
      displayName: authenticationDomain.displayName,
    };

    authenticationDomain.apply(
      new AuthenticationLoginnedAccountEvent(
        authenticationDomain.displayName,
        authenticationDomain.email
      )
    );

    authenticationDomain.commit();

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
