import { EventPublisher, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { AuthenticationBaseDomain } from '@ustagil/api/core/authentication/typing';
import { JWTPayload } from '@ustagil/api/core/common/typing';
import { SuperAdminLoginnedEvent } from '../../event';
import { SuperAdminLoginQuery } from './login.query';

@QueryHandler(SuperAdminLoginQuery)
export class SuperAdminLoginHandler
  implements IQueryHandler<SuperAdminLoginQuery>
{
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly jwtService: JwtService
  ) {}

  async execute({ dto }: SuperAdminLoginQuery): Promise<{
    access_token: string;
  }> {
    const { displayName, email, id, role } = dto;

    const AuthenticationBaseMergedDomain =
      this.eventPublisher.mergeClassContext(AuthenticationBaseDomain);

    const authenticationBaseDomain = new AuthenticationBaseMergedDomain({
      displayName,
      email,
      role,
    });

    const payload: JWTPayload = {
      sub: id,
      role: authenticationBaseDomain.role,
    };

    authenticationBaseDomain.apply(
      new SuperAdminLoginnedEvent(
        authenticationBaseDomain.displayName,
        authenticationBaseDomain.email
      )
    );

    authenticationBaseDomain.commit();

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
