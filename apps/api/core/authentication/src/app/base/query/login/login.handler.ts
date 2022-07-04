import { EventPublisher, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { AuthenticationBaseDomain } from '@ustagil/api/core/authentication/typing';
import { JWTPayload } from '@ustagil/api/core/common/typing';
import { BaseLoginnedEvent } from '../../event';
import { BaseLoginQuery } from './login.query';

@QueryHandler(BaseLoginQuery)
export class BaseLoginHandler implements IQueryHandler<BaseLoginQuery> {
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly jwtService: JwtService
  ) {}

  async execute({ dto }: BaseLoginQuery): Promise<{
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
      new BaseLoginnedEvent(
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
