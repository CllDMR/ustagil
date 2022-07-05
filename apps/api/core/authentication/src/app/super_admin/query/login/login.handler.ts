import { EventPublisher, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { AuthenticationSuperAdminDomain } from '@ustagil/api/core/authentication/typing';
import { JWTPayload } from '@ustagil/api/core/common/typing';
import { AuthenticationSuperAdminLoginnedEvent } from '../../event';
import { AuthenticationSuperAdminLoginQuery } from './login.query';

@QueryHandler(AuthenticationSuperAdminLoginQuery)
export class AuthenticationSuperAdminLoginHandler
  implements IQueryHandler<AuthenticationSuperAdminLoginQuery>
{
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly jwtService: JwtService
  ) {}

  async execute({ dto }: AuthenticationSuperAdminLoginQuery): Promise<{
    access_token: string;
  }> {
    const { displayName, email, id, role } = dto;

    const AuthenticationSuperAdminMergedDomain =
      this.eventPublisher.mergeClassContext(AuthenticationSuperAdminDomain);

    const authenticationSuperAdminDomain =
      new AuthenticationSuperAdminMergedDomain({
        displayName,
        email,
        role,
      });

    const payload: JWTPayload = {
      sub: id,
      role: authenticationSuperAdminDomain.role,
    };

    authenticationSuperAdminDomain.apply(
      new AuthenticationSuperAdminLoginnedEvent(
        authenticationSuperAdminDomain.displayName,
        authenticationSuperAdminDomain.email
      )
    );

    authenticationSuperAdminDomain.commit();

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
