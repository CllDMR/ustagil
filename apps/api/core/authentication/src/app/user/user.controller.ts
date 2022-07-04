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
import { UserRegisterCommand } from './command';
import { UserLoginQuery, UserValidateQuery } from './query';

@Controller()
export class UserController implements IAuthenticationGrpcController {
  constructor(
    private readonly commandBus: CommandBus<UserRegisterCommand>,
    private readonly queryBus: QueryBus<UserLoginQuery | UserValidateQuery>
  ) {}

  @GrpcMethod('UserService')
  async registerAccount(
    data: RegisterAccountRequest
  ): Promise<AuthenticationDomain> {
    return await this.commandBus.execute(new UserRegisterCommand(data));
  }

  @GrpcMethod('UserService')
  async loginAccount(data: LoginAccountRequest): Promise<LoginAccountResponse> {
    return await this.queryBus.execute(new UserLoginQuery(data));
  }

  @GrpcMethod('UserService')
  async validateAccount(
    data: ValidateAccountRequest
  ): Promise<AuthenticationDomain> {
    return await this.queryBus.execute(new UserValidateQuery(data));
  }
}
