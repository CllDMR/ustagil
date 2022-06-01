import { Inject } from '@nestjs/common';
import { EventPublisher, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { ClientKafka } from '@nestjs/microservices';
import { ACCOUNT_MS_KAFKA } from '@ustagil/api/core/account/constant';
import { AuthenticationDomain } from '@ustagil/api/core/authentication/typing';
import { AuthenticationLoginnedAccountEvent } from '../../event';
import { AuthenticationLoginAccountQuery } from './authentication-login-account.query';

@QueryHandler(AuthenticationLoginAccountQuery)
export class AuthenticationLoginAccountHandler
  implements IQueryHandler<AuthenticationLoginAccountQuery>
{
  constructor(
    private readonly eventPublisher: EventPublisher,
    @Inject(ACCOUNT_MS_KAFKA) private accountMSClient: ClientKafka,
    private jwtService: JwtService
  ) {}

  async execute({ dto }: AuthenticationLoginAccountQuery) {
    const { email, displayName, id } = dto;
    const authenticationDomain = new AuthenticationDomain({
      email,
      displayName,
    });

    const authentication =
      this.eventPublisher.mergeObjectContext(authenticationDomain);

    authentication.apply(
      new AuthenticationLoginnedAccountEvent(
        authentication.displayName,
        authentication.email
      )
    );

    authentication.commit();

    const payload = {
      sub: id,
      email: authentication.email,
      displayName: authentication.displayName,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
