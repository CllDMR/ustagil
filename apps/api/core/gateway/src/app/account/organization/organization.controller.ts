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
    return this.organizationGrpcService.CreateOrganization({
      organization: dto,
    });
  }

  @Get('account/organizations')
  getOrganizations(@Query() dto: OrganizationFindAllQueryDto) {
    return this.organizationGrpcService.ListOrganizations({
      page_size: dto.page_size ?? 10,
    });
  }

  @Get('account/organizations/:id')
  getOrganization(@Param('id') id: string) {
    return this.organizationGrpcService.GetOrganization({ id });
  }

  @Patch('account/organizations/:id')
  patchOrganization(
    @Param('id') id: string,
    @Body() dto: OrganizationUpdateOneBodyDto
  ) {
    return this.organizationGrpcService.UpdateOrganization({
      id,
      organization: dto,
    });
  }

  @Delete('account/organizations/:id')
  deleteOrganization(@Param('id') id: string) {
    return this.organizationGrpcService.DeleteOrganization({ id });
  }
}
