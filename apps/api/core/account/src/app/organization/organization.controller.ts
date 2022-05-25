import { Metadata } from '@grpc/grpc-js';
import { Controller, UseFilters } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';
import {
  CreateOrganizationRequest,
  DeleteOrganizationRequest,
  GetOrganizationRequest,
  IOrganizationGrpcController,
  ListOrganizationsRequest,
  ListOrganizationsResponse,
  OrganizationDomain,
  UpdateOrganizationRequest,
} from '@ustagil/api/core/account/typing';
import {
  AllCustomRpcExceptionsFilter,
  TimeoutErrorRpcExceptionsFilter,
} from '@ustagil/api/core/common/typing';
import {
  OrganizationCreateOneCommand,
  OrganizationDeleteOneCommand,
  OrganizationUpdateOneCommand,
} from './command';
import { OrganizationReadAllQuery, OrganizationReadOneQuery } from './query';

@UseFilters(AllCustomRpcExceptionsFilter, TimeoutErrorRpcExceptionsFilter)
@Controller()
export class OrganizationController implements IOrganizationGrpcController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @GrpcMethod('OrganizationService')
  async listOrganizations(
    data: ListOrganizationsRequest,
    _metadata: Metadata
  ): Promise<ListOrganizationsResponse> {
    const organizations = await this.queryBus.execute(
      new OrganizationReadAllQuery(data)
    );

    return {
      organizations,
      next_page_token: '',
    };
  }

  @GrpcMethod('OrganizationService')
  async getOrganization(
    data: GetOrganizationRequest,
    _metadata: Metadata
  ): Promise<OrganizationDomain> {
    return await this.queryBus.execute(new OrganizationReadOneQuery(data));
  }

  @GrpcMethod('OrganizationService')
  async createOrganization(
    data: CreateOrganizationRequest,
    _metadata: Metadata
  ): Promise<OrganizationDomain> {
    return await this.commandBus.execute(
      new OrganizationCreateOneCommand(data.organization)
    );
  }

  @GrpcMethod('OrganizationService')
  async updateOrganization(
    data: UpdateOrganizationRequest,
    _metadata: Metadata
  ): Promise<OrganizationDomain> {
    return await this.commandBus.execute(
      new OrganizationUpdateOneCommand({
        id: data.id,
        ...data.organization,
      })
    );
  }

  @GrpcMethod('OrganizationService')
  async deleteOrganization(
    data: DeleteOrganizationRequest,
    _metadata: Metadata
  ): Promise<void> {
    return await this.commandBus.execute(
      new OrganizationDeleteOneCommand(data)
    );
  }
}
