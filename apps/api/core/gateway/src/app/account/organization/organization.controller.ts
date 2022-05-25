import { Metadata } from '@grpc/grpc-js';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  OnModuleInit,
  Param,
  Patch,
  Post,
  Query,
  UseFilters,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { IOrganizationGrpcController } from '@ustagil/api/core/account/typing';
import {
  AllExceptionsFilter,
  TimeoutErrorExceptionsFilter,
} from '@ustagil/api/core/common/typing';
import {
  OrganizationCreateOneBodyDto,
  OrganizationFindAllQueryDto,
  OrganizationUpdateOneBodyDto,
} from './dtos';

@UseFilters(AllExceptionsFilter, TimeoutErrorExceptionsFilter)
@Controller()
export class OrganizationController implements OnModuleInit {
  private organizationGrpcService: IOrganizationGrpcController;
  @Inject('ACCOUNT_ORGANIZATION_GRPC_SERVICE')
  private organizationMSGrpcClient: ClientGrpc;

  onModuleInit() {
    this.organizationGrpcService =
      this.organizationMSGrpcClient.getService<IOrganizationGrpcController>(
        'OrganizationService'
      );
  }

  @Post('account/organizations')
  postOrganization(@Body() dto: OrganizationCreateOneBodyDto) {
    return this.organizationGrpcService.createOrganization(
      { organization: dto },
      new Metadata()
    );
  }

  @Get('account/organizations')
  getOrganizations(@Query() dto: OrganizationFindAllQueryDto) {
    return this.organizationGrpcService.listOrganizations(
      { page_size: dto.page_size ?? 10, page_token: dto.page_token ?? '' },
      new Metadata()
    );
  }

  @Get('account/organizations/:organization_id')
  getOrganization(@Param('organization_id') organization_id: string) {
    return this.organizationGrpcService.getOrganization(
      { id: organization_id },
      new Metadata()
    );
  }

  @Patch('account/organizations/:organization_id')
  patchOrganization(
    @Param('organization_id') organization_id: string,
    @Body() dto: OrganizationUpdateOneBodyDto
  ) {
    return this.organizationGrpcService.updateOrganization(
      { id: organization_id, organization: dto },
      new Metadata()
    );
  }

  @Delete('account/organizations/:organization_id')
  deleteOrganization(@Param('organization_id') organization_id: string) {
    return this.organizationGrpcService.deleteOrganization(
      { id: organization_id },
      new Metadata()
    );
  }
}
