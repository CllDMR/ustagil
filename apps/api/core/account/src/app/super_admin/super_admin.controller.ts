import { Metadata } from '@grpc/grpc-js';
import { Controller, UseFilters } from '@nestjs/common';
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
  AllCustomRpcExceptionsFilter,
  TimeoutErrorRpcExceptionsFilter,
} from '@ustagil/api/core/common/typing';
import {
  SuperAdminCreateOneCommand,
  SuperAdminDeleteOneCommand,
  SuperAdminUpdateOneCommand,
} from './command';
import { SuperAdminReadAllQuery, SuperAdminReadOneQuery } from './query';

@UseFilters(AllCustomRpcExceptionsFilter, TimeoutErrorRpcExceptionsFilter)
@Controller()
export class SuperAdminController implements ISuperAdminGrpcController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @GrpcMethod('SuperAdminService')
  async listSuperAdmins(
    data: ListSuperAdminsRequest,
    _metadata: Metadata
  ): Promise<ListSuperAdminsResponse> {
    const super_admins = await this.queryBus.execute(
      new SuperAdminReadAllQuery(data)
    );

    return {
      super_admins,
    };
  }

  @GrpcMethod('SuperAdminService')
  async getSuperAdmin(
    data: GetSuperAdminRequest,
    _metadata: Metadata
  ): Promise<SuperAdminDomain> {
    return await this.queryBus.execute(new SuperAdminReadOneQuery(data));
  }

  @GrpcMethod('SuperAdminService')
  async createSuperAdmin(
    data: CreateSuperAdminRequest,
    _metadata: Metadata
  ): Promise<SuperAdminDomain> {
    return await this.commandBus.execute(
      new SuperAdminCreateOneCommand(data.super_admin)
    );
  }

  @GrpcMethod('SuperAdminService')
  async updateSuperAdmin(
    data: UpdateSuperAdminRequest,
    _metadata: Metadata
  ): Promise<SuperAdminDomain> {
    return await this.commandBus.execute(
      new SuperAdminUpdateOneCommand({
        id: data.id,
        ...data.super_admin,
      })
    );
  }

  @GrpcMethod('SuperAdminService')
  async deleteSuperAdmin(
    data: DeleteSuperAdminRequest,
    _metadata: Metadata
  ): Promise<void> {
    return await this.commandBus.execute(new SuperAdminDeleteOneCommand(data));
  }
}
