import { Metadata } from '@grpc/grpc-js';
import { Controller, UseFilters } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';
import {
  AccountDomain,
  CreateAccountRequest,
  DeleteAccountRequest,
  GetAccountRequest,
  IAccountGrpcController,
  ListAccountsRequest,
  ListAccountsResponse,
  UpdateAccountRequest,
} from '@ustagil/api/core/account/typing';
import {
  AllCustomRpcExceptionsFilter,
  TimeoutErrorRpcExceptionsFilter,
} from '@ustagil/api/core/common/typing';
import {
  AccountCreateOneCommand,
  AccountDeleteOneCommand,
  AccountUpdateOneCommand,
} from './command';
import { AccountReadAllQuery, AccountReadOneQuery } from './query';

@UseFilters(AllCustomRpcExceptionsFilter, TimeoutErrorRpcExceptionsFilter)
@Controller()
export class AccountController implements IAccountGrpcController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @GrpcMethod('AccountService')
  async listAccounts(
    data: ListAccountsRequest,
    _metadata: Metadata
  ): Promise<ListAccountsResponse> {
    const accounts = await this.queryBus.execute(new AccountReadAllQuery(data));

    return {
      accounts,
      next_page_token: '',
    };
  }

  @GrpcMethod('AccountService')
  async getAccount(
    data: GetAccountRequest,
    _metadata: Metadata
  ): Promise<AccountDomain> {
    return await this.queryBus.execute(new AccountReadOneQuery(data));
  }

  @GrpcMethod('AccountService')
  async createAccount(
    data: CreateAccountRequest,
    _metadata: Metadata
  ): Promise<AccountDomain> {
    return await this.commandBus.execute(
      new AccountCreateOneCommand(data.account)
    );
  }

  @GrpcMethod('AccountService')
  async updateAccount(
    data: UpdateAccountRequest,
    _metadata: Metadata
  ): Promise<AccountDomain> {
    return await this.commandBus.execute(
      new AccountUpdateOneCommand({
        id: data.id,
        ...data.account,
      })
    );
  }

  @GrpcMethod('AccountService')
  async deleteAccount(
    data: DeleteAccountRequest,
    _metadata: Metadata
  ): Promise<void> {
    return await this.commandBus.execute(new AccountDeleteOneCommand(data));
  }
}
