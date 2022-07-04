import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';
import {
  AuthenticationDomain,
  IAuthenticationGrpcController,
  LoginAccountRequest,
  LoginAccountResponse,
  RegisterAccountRequest,
  ValidateAccountRequest,
} from '@ustagil/api/core/authentication/typing';
import { OrganizationRegisterCommand } from './command';
import { OrganizationLoginQuery, OrganizationValidateQuery } from './query';

@Controller()
export class OrganizationController implements IAuthenticationGrpcController {
  constructor(
    private readonly commandBus: CommandBus<OrganizationRegisterCommand>,
    private readonly queryBus: QueryBus<
      OrganizationLoginQuery | OrganizationValidateQuery
    >
  ) {}

  @GrpcMethod('OrganizationService')
  async registerAccount(
    data: RegisterAccountRequest
  ): Promise<AuthenticationDomain> {
    return await this.commandBus.execute(new OrganizationRegisterCommand(data));
  }

  @GrpcMethod('OrganizationService')
  async loginAccount(data: LoginAccountRequest): Promise<LoginAccountResponse> {
    return await this.queryBus.execute(new OrganizationLoginQuery(data));
  }

  @GrpcMethod('OrganizationService')
  async validateAccount(
    data: ValidateAccountRequest
  ): Promise<AuthenticationDomain> {
    return await this.queryBus.execute(new OrganizationValidateQuery(data));
  }
}
