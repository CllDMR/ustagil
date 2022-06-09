import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';
import {
  AccountDomain,
  CreateAccountRequest,
  DeleteAccountRequest,
  GetAccountByEmailRequest,
  GetAccountRequest,
  IAccountGrpcController,
  ListAccountsRequest,
  ListAccountsResponse,
  UpdateAccountRequest,
} from '@ustagil/api/core/account/typing';
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
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @GrpcMethod('AccountService')
  async ListAccounts(data: ListAccountsRequest): Promise<ListAccountsResponse> {
    return await this.queryBus.execute(new AccountReadAllQuery(data));
  }

  @GrpcMethod('AccountService')
  async GetAccountByEmail(
    data: GetAccountByEmailRequest
  ): Promise<AccountDomain> {
    return await this.queryBus.execute(new AccountReadOneByEmailQuery(data));
  }

  @GrpcMethod('AccountService')
  async GetAccount(data: GetAccountRequest): Promise<AccountDomain> {
    return await this.queryBus.execute(new AccountReadOneQuery(data));
  }

  @GrpcMethod('AccountService')
  async CreateAccount(data: CreateAccountRequest): Promise<AccountDomain> {
    return await this.commandBus.execute(new AccountCreateOneCommand(data));
  }

  @GrpcMethod('AccountService')
  async UpdateAccount(data: UpdateAccountRequest): Promise<AccountDomain> {
    return await this.commandBus.execute(
      new AccountUpdateOneCommand({
        id: data.id,
        ...data,
      })
    );
  }

  @GrpcMethod('AccountService')
  async DeleteAccount(data: DeleteAccountRequest): Promise<void> {
    return await this.commandBus.execute(new AccountDeleteOneCommand(data));
  }
}
