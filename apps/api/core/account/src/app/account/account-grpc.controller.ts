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
export class AccountGrpcController implements IAccountGrpcController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @GrpcMethod('AccountService')
  async listAccounts(
    data: ListAccountsRequest,
    _metadata: Metadata
  ): Promise<ListAccountsResponse> {
    const query = new AccountReadAllQuery(data);

    console.log('query:', query);

    // return await this.queryBus.execute(query);

    return {
      accounts: [
        new AccountDomain({
          _id: 'asdasd',
          displayName: 'asdasd',
          email: 'asdasdasdasd',
          organization: 'qweqw',
          password: 'agagregwg',
        }),
      ],
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
    const { _id, ...rest } = data.account;
    return await this.commandBus.execute(
      new AccountUpdateOneCommand({
        id: _id,
        ...rest,
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
