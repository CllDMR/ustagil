import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';
import {
  AuthenticationBaseDomain,
  AuthenticationBaseLoginAccountRequest,
  AuthenticationBaseLoginAccountResponse,
  AuthenticationBaseRegisterAccountRequest,
  AuthenticationBaseValidateAccountRequest,
  IAuthenticationBaseGrpcService,
} from '@ustagil/api/core/authentication/typing';
import { AuthenticationBaseRegisterCommand } from './command';
import {
  AuthenticationBaseLoginQuery,
  AuthenticationBaseValidateQuery,
} from './query';

@Controller()
export class AuthenticationBaseController
  implements IAuthenticationBaseGrpcService
{
  constructor(
    private readonly commandBus: CommandBus<AuthenticationBaseRegisterCommand>,
    private readonly queryBus: QueryBus<
      AuthenticationBaseLoginQuery | AuthenticationBaseValidateQuery
    >
  ) {}

  @GrpcMethod('AuthenticationBaseService')
  async registerAccountBase(
    data: AuthenticationBaseRegisterAccountRequest
  ): Promise<AuthenticationBaseDomain> {
    return await this.commandBus.execute(
      new AuthenticationBaseRegisterCommand(data)
    );
  }

  @GrpcMethod('AuthenticationBaseService')
  async loginAccountBase(
    data: AuthenticationBaseLoginAccountRequest
  ): Promise<AuthenticationBaseLoginAccountResponse> {
    return await this.queryBus.execute(new AuthenticationBaseLoginQuery(data));
  }

  @GrpcMethod('AuthenticationBaseService')
  async validateAccountBase(
    data: AuthenticationBaseValidateAccountRequest
  ): Promise<AuthenticationBaseDomain> {
    return await this.queryBus.execute(
      new AuthenticationBaseValidateQuery(data)
    );
  }
}
