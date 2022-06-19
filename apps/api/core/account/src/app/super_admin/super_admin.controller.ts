import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';
import {
  CreateSuperAdminRequest,
  DeleteSuperAdminRequest,
  GetSuperAdminByEmailRequest,
  GetSuperAdminRequest,
  ISuperAdminGrpcController,
  ListSuperAdminsRequest,
  ListSuperAdminsResponse,
  SuperAdminDomain,
  UpdateSuperAdminRequest,
} from '@ustagil/api/core/account/typing';
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
export class SuperAdminController implements ISuperAdminGrpcController {
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
  async ListSuperAdmins(
    data: ListSuperAdminsRequest
  ): Promise<ListSuperAdminsResponse> {
    return await this.queryBus.execute(new SuperAdminReadAllQuery(data));
  }

  @GrpcMethod('SuperAdminService')
  async GetSuperAdminByEmail(
    data: GetSuperAdminByEmailRequest
  ): Promise<SuperAdminDomain> {
    return await this.queryBus.execute(new SuperAdminReadOneByEmailQuery(data));
  }

  @GrpcMethod('SuperAdminService')
  async GetSuperAdmin(data: GetSuperAdminRequest): Promise<SuperAdminDomain> {
    return await this.queryBus.execute(new SuperAdminReadOneQuery(data));
  }

  @GrpcMethod('SuperAdminService')
  async CreateSuperAdmin(
    data: CreateSuperAdminRequest
  ): Promise<SuperAdminDomain> {
    return await this.commandBus.execute(new SuperAdminCreateOneCommand(data));
  }

  @GrpcMethod('SuperAdminService')
  async UpdateSuperAdmin(
    data: UpdateSuperAdminRequest
  ): Promise<SuperAdminDomain> {
    return await this.commandBus.execute(
      new SuperAdminUpdateOneCommand({
        id: data.id,
        ...data,
      })
    );
  }

  @GrpcMethod('SuperAdminService')
  async DeleteSuperAdmin(data: DeleteSuperAdminRequest): Promise<void> {
    return await this.commandBus.execute(new SuperAdminDeleteOneCommand(data));
  }
}
