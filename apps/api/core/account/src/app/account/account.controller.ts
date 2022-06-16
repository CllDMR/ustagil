import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';
import {
  AccountCreateOneRequest,
  AccountDeleteOneRequest,
  AccountFindAllRequest,
  AccountFindOneByEmailRequest,
  AccountFindOneRequest,
  AccountUpdateOneRequest,
  IAccountGrpcController,
} from '@ustagil/api/core/account/typing';
import { from } from 'rxjs';
import {
  AccountCreateOneCommand,
  AccountDeleteOneCommand,
  AccountUpdateOneCommand,
} from './command';
import {
  AccountReadAllQuery,
  AccountReadOneByEmailQuery,
  AccountReadOneQuery,
} from './query';

@Controller()
export class AccountController implements IAccountGrpcController {
  constructor(
    private readonly commandBus: CommandBus<
      | AccountCreateOneCommand
      | AccountDeleteOneCommand
      | AccountUpdateOneCommand
    >,
    private readonly queryBus: QueryBus<
      AccountReadAllQuery | AccountReadOneQuery | AccountReadOneByEmailQuery
    >
  ) {}

  @GrpcMethod('AccountService')
  ListAccounts(data: AccountFindAllRequest) {
    return from(this.queryBus.execute(new AccountReadAllQuery(data)));
  }

  @GrpcMethod('AccountService')
  GetAccountByEmail(data: AccountFindOneByEmailRequest) {
    return from(this.queryBus.execute(new AccountReadOneByEmailQuery(data)));
  }

  @GrpcMethod('AccountService')
  GetAccount(data: AccountFindOneRequest) {
    return from(this.queryBus.execute(new AccountReadOneQuery(data)));
  }

  @GrpcMethod('AccountService')
  CreateAccount(data: AccountCreateOneRequest) {
    return from(this.commandBus.execute(new AccountCreateOneCommand(data)));
  }

  @GrpcMethod('AccountService')
  UpdateAccount(data: AccountUpdateOneRequest) {
    return from(
      this.commandBus.execute(
        new AccountUpdateOneCommand({
          id: data.id,
          ...data,
        })
      )
    );
  }

  @GrpcMethod('AccountService')
  DeleteAccount(data: AccountDeleteOneRequest) {
    return from(this.commandBus.execute(new AccountDeleteOneCommand(data)));
  }
}
