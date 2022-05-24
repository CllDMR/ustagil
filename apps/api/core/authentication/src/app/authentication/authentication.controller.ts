import { Controller, UseFilters } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  AUTHENTICATION_LOGIN_ACCOUNT_MSMESSAGE,
  AUTHENTICATION_REGISTER_ACCOUNT_MSMESSAGE,
  AUTHENTICATION_VALIDATE_ACCOUNT_MSMESSAGE,
} from '@ustagil/api/core/authentication/constant';
import {
  AuthenticationLoginAccountMSMessage,
  AuthenticationRegisterAccountMSMessage,
  AuthenticationValidateAccountMSMessage,
} from '@ustagil/api/core/authentication/typing';
import {
  AllCustomRpcExceptionsFilter,
  TimeoutErrorRpcExceptionsFilter,
} from '@ustagil/api/core/common/typing';
import { AuthenticationRegisterAccountCommand } from './command';
import {
  AuthenticationLoginAccountQuery,
  AuthenticationValidateAccountQuery,
} from './query';

@UseFilters(AllCustomRpcExceptionsFilter, TimeoutErrorRpcExceptionsFilter)
@Controller()
export class AuthenticationController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @MessagePattern(AUTHENTICATION_REGISTER_ACCOUNT_MSMESSAGE)
  async registerAccount(
    @Payload('value') dto: AuthenticationRegisterAccountMSMessage
  ) {
    return await this.commandBus.execute(
      new AuthenticationRegisterAccountCommand(dto)
    );
  }

  @MessagePattern(AUTHENTICATION_LOGIN_ACCOUNT_MSMESSAGE)
  async loginAccount(
    @Payload('value') dto: AuthenticationLoginAccountMSMessage
  ) {
    return await this.queryBus.execute(
      new AuthenticationLoginAccountQuery(dto)
    );
  }

  @MessagePattern(AUTHENTICATION_VALIDATE_ACCOUNT_MSMESSAGE)
  async validateAccount(
    @Payload('value') dto: AuthenticationValidateAccountMSMessage
  ) {
    return await this.queryBus.execute(
      new AuthenticationValidateAccountQuery(dto)
    );
  }
}
