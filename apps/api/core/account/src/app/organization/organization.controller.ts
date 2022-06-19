import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';
import {
  IOrganizationGrpcController,
  OrganizationCreateOneRequest,
  OrganizationDeleteOneRequest,
  OrganizationFindAllRequest,
  OrganizationFindOneByEmailRequest,
  OrganizationFindOneRequest,
  OrganizationUpdateOneRequest,
} from '@ustagil/api/core/account/typing';
import { from } from 'rxjs';
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
  ListOrganizations(data: OrganizationFindAllRequest) {
    return from(this.queryBus.execute(new OrganizationReadAllQuery(data)));
  }

  @GrpcMethod('OrganizationService')
  GetOrganizationByEmail(data: OrganizationFindOneByEmailRequest) {
    return from(
      this.queryBus.execute(new OrganizationReadOneByEmailQuery(data))
    );
  }

  @GrpcMethod('OrganizationService')
  GetOrganization(data: OrganizationFindOneRequest) {
    return from(this.queryBus.execute(new OrganizationReadOneQuery(data)));
  }

  @GrpcMethod('OrganizationService')
  CreateOrganization(data: OrganizationCreateOneRequest) {
    return from(
      this.commandBus.execute(new OrganizationCreateOneCommand(data))
    );
  }

  @GrpcMethod('OrganizationService')
  UpdateOrganization(data: OrganizationUpdateOneRequest) {
    return from(
      this.commandBus.execute(
        new OrganizationUpdateOneCommand({
          id: data.id,
          ...data,
        })
      )
    );
  }

  @GrpcMethod('OrganizationService')
  DeleteOrganization(data: OrganizationDeleteOneRequest) {
    return from(
      this.commandBus.execute(new OrganizationDeleteOneCommand(data))
    );
  }
}
