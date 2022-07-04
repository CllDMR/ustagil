import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';
import {
  IAccountSuperAdminGrpcService,
  SuperAdminCreateOneRequest,
  SuperAdminDeleteOneRequest,
  SuperAdminFindAllRequest,
  SuperAdminFindOneByEmailRequest,
  SuperAdminFindOneRequest,
  SuperAdminUpdateOneRequest,
} from '@ustagil/api/core/account/typing';
import { from } from 'rxjs';
import {
  SuperAdminCreateOneCommand,
  SuperAdminDeleteOneCommand,
  SuperAdminUpdateOneCommand,
} from './command';
import {
  SuperAdminReadAllQuery,
  SuperAdminReadOneByEmailQuery,
  SuperAdminReadOneQuery,
} from './query';

@Controller()
export class SuperAdminController implements IAccountSuperAdminGrpcService {
  constructor(
    private readonly commandBus: CommandBus<
      | SuperAdminCreateOneCommand
      | SuperAdminDeleteOneCommand
      | SuperAdminUpdateOneCommand
    >,
    private readonly queryBus: QueryBus<
      | SuperAdminReadAllQuery
      | SuperAdminReadOneByEmailQuery
      | SuperAdminReadOneQuery
    >
  ) {}

  @GrpcMethod('SuperAdminService')
  ListSuperAdmins(data: SuperAdminFindAllRequest) {
    return from(this.queryBus.execute(new SuperAdminReadAllQuery(data)));
  }

  @GrpcMethod('SuperAdminService')
  GetSuperAdminByEmail(data: SuperAdminFindOneByEmailRequest) {
    return from(this.queryBus.execute(new SuperAdminReadOneByEmailQuery(data)));
  }

  @GrpcMethod('SuperAdminService')
  GetSuperAdmin(data: SuperAdminFindOneRequest) {
    return from(this.queryBus.execute(new SuperAdminReadOneQuery(data)));
  }

  @GrpcMethod('SuperAdminService')
  CreateSuperAdmin(data: SuperAdminCreateOneRequest) {
    return from(this.commandBus.execute(new SuperAdminCreateOneCommand(data)));
  }

  @GrpcMethod('SuperAdminService')
  UpdateSuperAdmin(data: SuperAdminUpdateOneRequest) {
    return from(
      this.commandBus.execute(
        new SuperAdminUpdateOneCommand({
          id: data.id,
          ...data,
        })
      )
    );
  }

  @GrpcMethod('SuperAdminService')
  DeleteSuperAdmin(data: SuperAdminDeleteOneRequest) {
    return from(this.commandBus.execute(new SuperAdminDeleteOneCommand(data)));
  }
}
