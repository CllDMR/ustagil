import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';
import { AccountDomain } from '@ustagil/api/core/account/typing';
import {
  AuthenticationDomain,
  IAuthenticationGrpcController,
  LoginAccountRequest,
  LoginAccountResponse,
  RegisterAccountRequest,
  ValidateAccountRequest,
} from '@ustagil/api/core/authentication/typing';
import { AuthenticationRegisterAccountCommand } from './command';
import {
  AuthenticationLoginAccountQuery,
  AuthenticationValidateAccountQuery,
} from './query';

@Controller()
export class AuthenticationController implements IAuthenticationGrpcController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @GrpcMethod('AuthenticationService')
  async registerAccount(
    data: RegisterAccountRequest
  ): Promise<AuthenticationDomain> {
    return await this.commandBus.execute(
      new AuthenticationRegisterAccountCommand(data)
    );
  }

  @GrpcMethod('AuthenticationService')
  async loginAccount(data: LoginAccountRequest): Promise<LoginAccountResponse> {
    return await this.queryBus.execute(
      new AuthenticationLoginAccountQuery(data)
    );
  }

  @GrpcMethod('AuthenticationService')
  async validateAccount(data: ValidateAccountRequest): Promise<AccountDomain> {
    return await this.queryBus.execute(
      new AuthenticationValidateAccountQuery(data)
    );
  }
}
