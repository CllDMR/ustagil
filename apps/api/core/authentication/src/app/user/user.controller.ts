import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';
import {
  AuthenticationUserDomain,
  AuthenticationUserLoginAccountRequest,
  AuthenticationUserLoginAccountResponse,
  AuthenticationUserRegisterAccountRequest,
  AuthenticationUserValidateAccountRequest,
  IAuthenticationUserGrpcService,
} from '@ustagil/api/core/authentication/typing';
import { AuthenticationUserRegisterCommand } from './command';
import {
  AuthenticationUserLoginQuery,
  AuthenticationUserValidateQuery,
} from './query';

@Controller()
export class AuthenticationUserController
  implements IAuthenticationUserGrpcService
{
  constructor(
    private readonly commandBus: CommandBus<AuthenticationUserRegisterCommand>,
    private readonly queryBus: QueryBus<
      AuthenticationUserLoginQuery | AuthenticationUserValidateQuery
    >
  ) {}

  @GrpcMethod('AuthenticationUserService')
  async registerAccountUser(
    data: AuthenticationUserRegisterAccountRequest
  ): Promise<AuthenticationUserDomain> {
    return await this.commandBus.execute(
      new AuthenticationUserRegisterCommand(data)
    );
  }

  @GrpcMethod('AuthenticationUserService')
  async loginAccountUser(
    data: AuthenticationUserLoginAccountRequest
  ): Promise<AuthenticationUserLoginAccountResponse> {
    return await this.queryBus.execute(new AuthenticationUserLoginQuery(data));
  }

  @GrpcMethod('AuthenticationUserService')
  async validateAccountUser(
    data: AuthenticationUserValidateAccountRequest
  ): Promise<AuthenticationUserDomain> {
    return await this.queryBus.execute(
      new AuthenticationUserValidateQuery(data)
    );
  }
}
