import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';
import {
  AuthenticationBaseDomain,
  IAuthenticationGrpcController,
  LoginAccountRequest,
  LoginAccountResponse,
  RegisterAccountRequest,
  ValidateAccountRequest,
} from '@ustagil/api/core/authentication/typing';
import { BaseRegisterCommand } from './command';
import { BaseLoginQuery, BaseValidateQuery } from './query';

@Controller()
export class BaseController implements IAuthenticationGrpcController {
  constructor(
    private readonly commandBus: CommandBus<BaseRegisterCommand>,
    private readonly queryBus: QueryBus<BaseLoginQuery | BaseValidateQuery>
  ) {}

  @GrpcMethod('BaseService')
  async registerAccount(
    data: RegisterAccountRequest
  ): Promise<AuthenticationBaseDomain> {
    return await this.commandBus.execute(new BaseRegisterCommand(data));
  }

  @GrpcMethod('BaseService')
  async loginAccount(data: LoginAccountRequest): Promise<LoginAccountResponse> {
    return await this.queryBus.execute(new BaseLoginQuery(data));
  }

  @GrpcMethod('BaseService')
  async validateAccount(
    data: ValidateAccountRequest
  ): Promise<AuthenticationBaseDomain> {
    return await this.queryBus.execute(new BaseValidateQuery(data));
  }
}
