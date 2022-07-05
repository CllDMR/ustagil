import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';
import {
  AuthenticationOrganizationDomain,
  AuthenticationOrganizationLoginAccountRequest,
  AuthenticationOrganizationLoginAccountResponse,
  AuthenticationOrganizationRegisterAccountRequest,
  AuthenticationOrganizationValidateAccountRequest,
  IAuthenticationOrganizationGrpcService,
} from '@ustagil/api/core/authentication/typing';
import { AuthenticationOrganizationRegisterCommand } from './command';
import {
  AuthenticationOrganizationLoginQuery,
  AuthenticationOrganizationValidateQuery,
} from './query';

@Controller()
export class AuthenticationOrganizationController
  implements IAuthenticationOrganizationGrpcService
{
  constructor(
    private readonly commandBus: CommandBus<AuthenticationOrganizationRegisterCommand>,
    private readonly queryBus: QueryBus<
      | AuthenticationOrganizationLoginQuery
      | AuthenticationOrganizationValidateQuery
    >
  ) {}

  @GrpcMethod('AuthenticationOrganizationService')
  async registerAccountOrganization(
    data: AuthenticationOrganizationRegisterAccountRequest
  ): Promise<AuthenticationOrganizationDomain> {
    return await this.commandBus.execute(
      new AuthenticationOrganizationRegisterCommand(data)
    );
  }

  @GrpcMethod('AuthenticationOrganizationService')
  async loginAccountOrganization(
    data: AuthenticationOrganizationLoginAccountRequest
  ): Promise<AuthenticationOrganizationLoginAccountResponse> {
    return await this.queryBus.execute(
      new AuthenticationOrganizationLoginQuery(data)
    );
  }

  @GrpcMethod('AuthenticationOrganizationService')
  async validateAccountOrganization(
    data: AuthenticationOrganizationValidateAccountRequest
  ): Promise<AuthenticationOrganizationDomain> {
    return await this.queryBus.execute(
      new AuthenticationOrganizationValidateQuery(data)
    );
  }
}
