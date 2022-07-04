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
import { SuperAdminRegisterCommand } from './command';
import { SuperAdminLoginQuery, SuperAdminValidateQuery } from './query';

@Controller()
export class SuperAdminController implements IAuthenticationGrpcController {
  constructor(
    private readonly commandBus: CommandBus<SuperAdminRegisterCommand>,
    private readonly queryBus: QueryBus<
      SuperAdminLoginQuery | SuperAdminValidateQuery
    >
  ) {}

  @GrpcMethod('SuperAdminService')
  async registerAccount(
    data: RegisterAccountRequest
  ): Promise<AuthenticationDomain> {
    return await this.commandBus.execute(new SuperAdminRegisterCommand(data));
  }

  @GrpcMethod('SuperAdminService')
  async loginAccount(data: LoginAccountRequest): Promise<LoginAccountResponse> {
    return await this.queryBus.execute(new SuperAdminLoginQuery(data));
  }

  @GrpcMethod('SuperAdminService')
  async validateAccount(
    data: ValidateAccountRequest
  ): Promise<AuthenticationDomain> {
    return await this.queryBus.execute(new SuperAdminValidateQuery(data));
  }
}
