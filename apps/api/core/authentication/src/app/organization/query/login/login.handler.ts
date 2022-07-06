import { EventPublisher, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { AuthenticationOrganizationDomain } from '@ustagil/api/core/authentication/typing';
import { JWTPayload } from '@ustagil/api/core/common/typing';
import { AuthenticationOrganizationLoginnedEvent } from '../../event';
import { AuthenticationOrganizationLoginQuery } from './login.query';

@QueryHandler(AuthenticationOrganizationLoginQuery)
export class AuthenticationOrganizationLoginHandler
  implements IQueryHandler<AuthenticationOrganizationLoginQuery>
{
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly jwtService: JwtService
  ) {}

  async execute({ dto }: AuthenticationOrganizationLoginQuery): Promise<{
    access_token: string;
  }> {
    const { id, role } = dto;

    const AuthenticationOrganizationMergedDomain =
      this.eventPublisher.mergeClassContext(AuthenticationOrganizationDomain);

    const authenticationOrganizationDomain =
      new AuthenticationOrganizationMergedDomain({
        id,
        role,
      });

    const payload: JWTPayload = {
      sub: id,
      role: authenticationOrganizationDomain.role,
    };

    authenticationOrganizationDomain.apply(
      new AuthenticationOrganizationLoginnedEvent(
        authenticationOrganizationDomain.id
      )
    );

    authenticationOrganizationDomain.commit();

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
