import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';
import {
  CreateOrganizationRequest,
  DeleteOrganizationRequest,
  GetOrganizationByEmailRequest,
  GetOrganizationRequest,
  IOrganizationGrpcController,
  ListOrganizationsRequest,
  ListOrganizationsResponse,
  OrganizationDomain,
  UpdateOrganizationRequest,
} from '@ustagil/api/core/account/typing';
import {
  OrganizationCreateOneCommand,
  OrganizationDeleteOneCommand,
  OrganizationUpdateOneCommand,
} from './command';
import {
  OrganizationReadAllQuery,
  OrganizationReadOneByEmailQuery,
  OrganizationReadOneQuery,
} from './query';

@Controller()
export class OrganizationController implements IOrganizationGrpcController {
  constructor(
    private readonly commandBus: CommandBus<
      | OrganizationCreateOneCommand
      | OrganizationDeleteOneCommand
      | OrganizationUpdateOneCommand
    >,
    private readonly queryBus: QueryBus<
      | OrganizationReadAllQuery
      | OrganizationReadOneByEmailQuery
      | OrganizationReadOneQuery
    >
  ) {}

  @GrpcMethod('OrganizationService')
  async ListOrganizations(
    data: ListOrganizationsRequest
  ): Promise<ListOrganizationsResponse> {
    return await this.queryBus.execute(new OrganizationReadAllQuery(data));
  }

  @GrpcMethod('OrganizationService')
  async GetOrganizationByEmail(
    data: GetOrganizationByEmailRequest
  ): Promise<OrganizationDomain> {
    return await this.queryBus.execute(
      new OrganizationReadOneByEmailQuery(data)
    );
  }

  @GrpcMethod('OrganizationService')
  async GetOrganization(
    data: GetOrganizationRequest
  ): Promise<OrganizationDomain> {
    return await this.queryBus.execute(new OrganizationReadOneQuery(data));
  }

  @GrpcMethod('OrganizationService')
  async CreateOrganization(
    data: CreateOrganizationRequest
  ): Promise<OrganizationDomain> {
    return await this.commandBus.execute(
      new OrganizationCreateOneCommand(data)
    );
  }

  @GrpcMethod('OrganizationService')
  async UpdateOrganization(
    data: UpdateOrganizationRequest
  ): Promise<OrganizationDomain> {
    return await this.commandBus.execute(
      new OrganizationUpdateOneCommand({
        id: data.id,
        ...data,
      })
    );
  }

  @GrpcMethod('OrganizationService')
  async DeleteOrganization(data: DeleteOrganizationRequest): Promise<void> {
    return await this.commandBus.execute(
      new OrganizationDeleteOneCommand(data)
    );
  }
}
