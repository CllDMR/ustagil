import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';
import {
  AccountUserCreateOneRequest,
  AccountUserDeleteOneRequest,
  AccountUserReadAllRequest,
  AccountUserReadOneByEmailRequest,
  AccountUserReadOneRequest,
  AccountUserUpdateOneRequest,
  IAccountUserGrpcService,
} from '@ustagil/api/core/account/typing';
import { from } from 'rxjs';
import {
  AccountUserCreateOneCommand,
  AccountUserDeleteOneCommand,
  AccountUserUpdateOneCommand,
} from './command';
import {
  AccountUserReadAllQuery,
  AccountUserReadOneByEmailQuery,
  AccountUserReadOneQuery,
} from './query';

@Controller()
export class AccountUserController implements IAccountUserGrpcService {
  constructor(
    private readonly commandBus: CommandBus<
      | AccountUserCreateOneCommand
      | AccountUserDeleteOneCommand
      | AccountUserUpdateOneCommand
    >,
    private readonly queryBus: QueryBus<
      | AccountUserReadAllQuery
      | AccountUserReadOneByEmailQuery
      | AccountUserReadOneQuery
    >
  ) {}

  @GrpcMethod('AccountUserService')
  ListAccountUsers(data: AccountUserReadAllRequest) {
    return from(this.queryBus.execute(new AccountUserReadAllQuery(data)));
  }

  @GrpcMethod('AccountUserService')
  GetAccountUserByEmail(data: AccountUserReadOneByEmailRequest) {
    return from(
      this.queryBus.execute(new AccountUserReadOneByEmailQuery(data))
    );
  }

  @GrpcMethod('AccountUserService')
  GetAccountUser(data: AccountUserReadOneRequest) {
    return from(this.queryBus.execute(new AccountUserReadOneQuery(data)));
  }

  @GrpcMethod('AccountUserService')
  CreateAccountUser(data: AccountUserCreateOneRequest) {
    return from(this.commandBus.execute(new AccountUserCreateOneCommand(data)));
  }

  @GrpcMethod('AccountUserService')
  UpdateAccountUser(data: AccountUserUpdateOneRequest) {
    return from(
      this.commandBus.execute(
        new AccountUserUpdateOneCommand({
          id: data.id,
          ...data,
        })
      )
    );
  }

  @GrpcMethod('AccountUserService')
  DeleteAccountUser(data: AccountUserDeleteOneRequest) {
    return from(this.commandBus.execute(new AccountUserDeleteOneCommand(data)));
  }
}
