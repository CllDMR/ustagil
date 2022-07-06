import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';
import {
  AccountOrganizationCreateOneRequest,
  AccountOrganizationDeleteOneRequest,
  AccountOrganizationReadAllRequest,
  AccountOrganizationReadOneByEmailRequest,
  AccountOrganizationReadOneRequest,
  AccountOrganizationUpdateOneRequest,
  IAccountOrganizationGrpcService,
} from '@ustagil/api/core/account/typing';
import { from } from 'rxjs';
import {
  AccountOrganizationCreateOneCommand,
  AccountOrganizationDeleteOneCommand,
  AccountOrganizationUpdateOneCommand,
} from './command';
import {
  AccountOrganizationReadAllQuery,
  AccountOrganizationReadOneByEmailQuery,
  AccountOrganizationReadOneQuery,
} from './query';

@Controller()
export class AccountOrganizationController
  implements IAccountOrganizationGrpcService
{
  constructor(
    private readonly commandBus: CommandBus<
      | AccountOrganizationCreateOneCommand
      | AccountOrganizationDeleteOneCommand
      | AccountOrganizationUpdateOneCommand
    >,
    private readonly queryBus: QueryBus<
      | AccountOrganizationReadAllQuery
      | AccountOrganizationReadOneByEmailQuery
      | AccountOrganizationReadOneQuery
    >
  ) {}

  @GrpcMethod('AccountOrganizationService')
  ListAccountOrganizations(data: AccountOrganizationReadAllRequest) {
    return from(
      this.queryBus.execute(new AccountOrganizationReadAllQuery(data))
    );
  }

  @GrpcMethod('AccountOrganizationService')
  GetAccountOrganizationByEmail(
    data: AccountOrganizationReadOneByEmailRequest
  ) {
    return from(
      this.queryBus.execute(new AccountOrganizationReadOneByEmailQuery(data))
    );
  }

  @GrpcMethod('AccountOrganizationService')
  GetAccountOrganization(data: AccountOrganizationReadOneRequest) {
    return from(
      this.queryBus.execute(new AccountOrganizationReadOneQuery(data))
    );
  }

  @GrpcMethod('AccountOrganizationService')
  CreateAccountOrganization(data: AccountOrganizationCreateOneRequest) {
    return from(
      this.commandBus.execute(new AccountOrganizationCreateOneCommand(data))
    );
  }

  @GrpcMethod('AccountOrganizationService')
  UpdateAccountOrganization(data: AccountOrganizationUpdateOneRequest) {
    return from(
      this.commandBus.execute(
        new AccountOrganizationUpdateOneCommand({
          id: data.id,
          ...data,
        })
      )
    );
  }

  @GrpcMethod('AccountOrganizationService')
  DeleteAccountOrganization(data: AccountOrganizationDeleteOneRequest) {
    return from(
      this.commandBus.execute(new AccountOrganizationDeleteOneCommand(data))
    );
  }
}
