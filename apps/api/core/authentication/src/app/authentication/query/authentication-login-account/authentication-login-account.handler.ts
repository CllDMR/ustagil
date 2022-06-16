import { EventPublisher, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { AuthenticationDomain } from '@ustagil/api/core/authentication/typing';
import { JWTPayload } from '@ustagil/api/core/common/typing';
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

  async execute({ dto }: AuthenticationLoginAccountQuery): Promise<{
    access_token: string;
  }> {
    const { displayName, email, id, organization, role } = dto;

    const AuthenticationMergedDomain =
      this.eventPublisher.mergeClassContext(AuthenticationDomain);

    const authenticationDomain = new AuthenticationMergedDomain({
      displayName,
      email,
      organization,
      role,
    });

    const payload: JWTPayload = {
      sub: id,
      role: authenticationDomain.role,
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
