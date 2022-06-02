import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';
import {
  CreateSuperAdminRequest,
  DeleteSuperAdminRequest,
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
import { SuperAdminReadAllQuery, SuperAdminReadOneQuery } from './query';

@Controller()
export class SuperAdminController implements ISuperAdminGrpcController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @GrpcMethod('SuperAdminService')
  async ListSuperAdmins(
    data: ListSuperAdminsRequest
  ): Promise<ListSuperAdminsResponse> {
    const super_admins = await this.queryBus.execute(
      new SuperAdminReadAllQuery(data)
    );

    return {
      super_admins,
    };
  }

  @GrpcMethod('SuperAdminService')
  async GetSuperAdmin(data: GetSuperAdminRequest): Promise<SuperAdminDomain> {
    return await this.queryBus.execute(new SuperAdminReadOneQuery(data));
  }

  @GrpcMethod('SuperAdminService')
  async CreateSuperAdmin(
    data: CreateSuperAdminRequest
  ): Promise<SuperAdminDomain> {
    return await this.commandBus.execute(
      new SuperAdminCreateOneCommand(data.super_admin)
    );
  }

  @GrpcMethod('SuperAdminService')
  async UpdateSuperAdmin(
    data: UpdateSuperAdminRequest
  ): Promise<SuperAdminDomain> {
    return await this.commandBus.execute(
      new SuperAdminUpdateOneCommand({
        id: data.id,
        ...data.super_admin,
      })
    );
  }

  @GrpcMethod('SuperAdminService')
  async DeleteSuperAdmin(data: DeleteSuperAdminRequest): Promise<void> {
    return await this.commandBus.execute(new SuperAdminDeleteOneCommand(data));
  }
}
