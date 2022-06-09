import { Controller } from '@nestjs/common';
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
  OrganizationCreateOneCommand,
  OrganizationDeleteOneCommand,
  OrganizationUpdateOneCommand,
} from './command';
import { OrganizationReadAllQuery, OrganizationReadOneQuery } from './query';

@Controller()
export class OrganizationController implements IOrganizationGrpcController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @GrpcMethod('OrganizationService')
  async ListOrganizations(
    data: ListOrganizationsRequest
  ): Promise<ListOrganizationsResponse> {
    const organizations = await this.queryBus.execute(
      new OrganizationReadAllQuery(data)
    );

    return {
      organizations,
    };
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
      new OrganizationCreateOneCommand(data.organization)
    );
  }

  @GrpcMethod('OrganizationService')
  async UpdateOrganization(
    data: UpdateOrganizationRequest
  ): Promise<OrganizationDomain> {
    return await this.commandBus.execute(
      new OrganizationUpdateOneCommand({
        id: data.id,
        ...data.organization,
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
