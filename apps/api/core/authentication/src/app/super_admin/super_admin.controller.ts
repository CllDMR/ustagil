import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';
import {
  AuthenticationSuperAdminDomain,
  AuthenticationSuperAdminLoginAccountRequest,
  AuthenticationSuperAdminLoginAccountResponse,
  AuthenticationSuperAdminRegisterAccountRequest,
  AuthenticationSuperAdminValidateAccountRequest,
  IAuthenticationSuperAdminGrpcService,
} from '@ustagil/api/core/authentication/typing';
import { AuthenticationSuperAdminRegisterCommand } from './command';
import {
  AuthenticationSuperAdminLoginQuery,
  AuthenticationSuperAdminValidateQuery,
} from './query';

@Controller()
export class AuthenticationSuperAdminController
  implements IAuthenticationSuperAdminGrpcService
{
  constructor(
    private readonly commandBus: CommandBus<AuthenticationSuperAdminRegisterCommand>,
    private readonly queryBus: QueryBus<
      AuthenticationSuperAdminLoginQuery | AuthenticationSuperAdminValidateQuery
    >
  ) {}

  @GrpcMethod('AuthenticationSuperAdminService')
  async registerAccountSuperAdmin(
    data: AuthenticationSuperAdminRegisterAccountRequest
  ): Promise<AuthenticationSuperAdminDomain> {
    return await this.commandBus.execute(
      new AuthenticationSuperAdminRegisterCommand(data)
    );
  }

  @GrpcMethod('AuthenticationSuperAdminService')
  async loginAccountSuperAdmin(
    data: AuthenticationSuperAdminLoginAccountRequest
  ): Promise<AuthenticationSuperAdminLoginAccountResponse> {
    return await this.queryBus.execute(
      new AuthenticationSuperAdminLoginQuery(data)
    );
  }

  @GrpcMethod('AuthenticationSuperAdminService')
  async validateAccountSuperAdmin(
    data: AuthenticationSuperAdminValidateAccountRequest
  ): Promise<AuthenticationSuperAdminDomain> {
    return await this.queryBus.execute(
      new AuthenticationSuperAdminValidateQuery(data)
    );
  }
}
