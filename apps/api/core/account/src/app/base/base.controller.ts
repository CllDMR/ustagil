import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';
import {
  AccountBaseCreateOneRequest,
  AccountBaseDeleteOneRequest,
  AccountBaseReadAllRequest,
  AccountBaseReadOneByEmailRequest,
  AccountBaseReadOneRequest,
  AccountBaseUpdateOneRequest,
  IAccountBaseGrpcService,
} from '@ustagil/api/core/account/typing';
import { from } from 'rxjs';
import {
  AccountBaseCreateOneCommand,
  AccountBaseDeleteOneCommand,
  AccountBaseUpdateOneCommand,
} from './command';
import {
  AccountBaseReadAllQuery,
  AccountBaseReadOneByEmailQuery,
  AccountBaseReadOneQuery,
} from './query';

@Controller()
export class AccountBaseController implements IAccountBaseGrpcService {
  constructor(
    private readonly commandBus: CommandBus<
      | AccountBaseCreateOneCommand
      | AccountBaseDeleteOneCommand
      | AccountBaseUpdateOneCommand
    >,
    private readonly queryBus: QueryBus<
      | AccountBaseReadAllQuery
      | AccountBaseReadOneQuery
      | AccountBaseReadOneByEmailQuery
    >
  ) {}

  @GrpcMethod('AccountBaseService')
  ListAccountBases(data: AccountBaseReadAllRequest) {
    return from(this.queryBus.execute(new AccountBaseReadAllQuery(data)));
  }

  @GrpcMethod('AccountBaseService')
  GetAccountBaseByEmail(data: AccountBaseReadOneByEmailRequest) {
    return from(
      this.queryBus.execute(new AccountBaseReadOneByEmailQuery(data))
    );
  }

  @GrpcMethod('AccountBaseService')
  GetAccountBase(data: AccountBaseReadOneRequest) {
    return from(this.queryBus.execute(new AccountBaseReadOneQuery(data)));
  }

  @GrpcMethod('AccountBaseService')
  CreateAccountBase(data: AccountBaseCreateOneRequest) {
    return from(this.commandBus.execute(new AccountBaseCreateOneCommand(data)));
  }

  @GrpcMethod('AccountBaseService')
  UpdateAccountBase(data: AccountBaseUpdateOneRequest) {
    return from(
      this.commandBus.execute(
        new AccountBaseUpdateOneCommand({
          id: data.id,
          ...data,
        })
      )
    );
  }

  @GrpcMethod('AccountBaseService')
  DeleteAccountBase(data: AccountBaseDeleteOneRequest) {
    return from(this.commandBus.execute(new AccountBaseDeleteOneCommand(data)));
  }
}
