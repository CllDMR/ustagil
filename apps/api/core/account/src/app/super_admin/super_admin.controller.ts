import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';
import {
  AccountSuperAdminCreateOneRequest,
  AccountSuperAdminDeleteOneRequest,
  AccountSuperAdminReadAllRequest,
  AccountSuperAdminReadOneByEmailRequest,
  AccountSuperAdminReadOneRequest,
  AccountSuperAdminUpdateOneRequest,
  IAccountSuperAdminGrpcService,
} from '@ustagil/api/core/account/typing';
import { from } from 'rxjs';
import {
  AccountSuperAdminCreateOneCommand,
  AccountSuperAdminDeleteOneCommand,
  AccountSuperAdminUpdateOneCommand,
} from './command';
import {
  AccountSuperAdminReadAllQuery,
  AccountSuperAdminReadOneByEmailQuery,
  AccountSuperAdminReadOneQuery,
} from './query';

@Controller()
export class AccountSuperAdminController
  implements IAccountSuperAdminGrpcService
{
  constructor(
    private readonly commandBus: CommandBus<
      | AccountSuperAdminCreateOneCommand
      | AccountSuperAdminDeleteOneCommand
      | AccountSuperAdminUpdateOneCommand
    >,
    private readonly queryBus: QueryBus<
      | AccountSuperAdminReadAllQuery
      | AccountSuperAdminReadOneByEmailQuery
      | AccountSuperAdminReadOneQuery
    >
  ) {}

  @GrpcMethod('AccountSuperAdminService')
  ListAccountSuperAdmins(data: AccountSuperAdminReadAllRequest) {
    return from(this.queryBus.execute(new AccountSuperAdminReadAllQuery(data)));
  }

  @GrpcMethod('AccountSuperAdminService')
  GetAccountSuperAdminByEmail(data: AccountSuperAdminReadOneByEmailRequest) {
    return from(
      this.queryBus.execute(new AccountSuperAdminReadOneByEmailQuery(data))
    );
  }

  @GrpcMethod('AccountSuperAdminService')
  GetAccountSuperAdmin(data: AccountSuperAdminReadOneRequest) {
    return from(this.queryBus.execute(new AccountSuperAdminReadOneQuery(data)));
  }

  @GrpcMethod('AccountSuperAdminService')
  CreateAccountSuperAdmin(data: AccountSuperAdminCreateOneRequest) {
    return from(
      this.commandBus.execute(new AccountSuperAdminCreateOneCommand(data))
    );
  }

  @GrpcMethod('AccountSuperAdminService')
  UpdateAccountSuperAdmin(data: AccountSuperAdminUpdateOneRequest) {
    return from(
      this.commandBus.execute(
        new AccountSuperAdminUpdateOneCommand({
          id: data.id,
          ...data,
        })
      )
    );
  }

  @GrpcMethod('AccountSuperAdminService')
  DeleteAccountSuperAdmin(data: AccountSuperAdminDeleteOneRequest) {
    return from(
      this.commandBus.execute(new AccountSuperAdminDeleteOneCommand(data))
    );
  }
}
