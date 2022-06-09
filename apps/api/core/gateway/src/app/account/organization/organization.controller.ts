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
import { ORGANIZATION_MS_GRPC } from '@ustagil/api/core/account/constant';
import { IOrganizationGrpcController } from '@ustagil/api/core/account/typing';
import {
  CheckPolicies,
  CreateOrganizationDomainPolicyHandler,
  DeleteOrganizationDomainPolicyHandler,
  ReadOrganizationDomainPolicyHandler,
  UpdateOrganizationDomainPolicyHandler,
} from '@ustagil/api/core/casl';
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

  constructor(
    @Inject(ORGANIZATION_MS_GRPC)
    private readonly organizationMSGrpcClient: ClientGrpc
  ) {}

  onModuleInit() {
    this.organizationGrpcService =
      this.organizationMSGrpcClient.getService<IOrganizationGrpcController>(
        'OrganizationService'
      );
  }

  @CheckPolicies(new CreateOrganizationDomainPolicyHandler())
  @Post('account/organizations')
  postOrganization(@Body() dto: OrganizationCreateOneBodyDto) {
    return this.organizationGrpcService.CreateOrganization({
      organization: dto,
    });
  }

  @CheckPolicies(new ReadOrganizationDomainPolicyHandler())
  @Get('account/organizations')
  getOrganizations(@Query() dto: OrganizationFindAllQueryDto) {
    return this.organizationGrpcService.ListOrganizations({
      page_size: dto.page_size ?? 10,
    });
  }

  @CheckPolicies(new ReadOrganizationDomainPolicyHandler())
  @Get('account/organizations/:id')
  getOrganization(@Param('id') id: string) {
    return this.organizationGrpcService.GetOrganization({ id });
  }

  @CheckPolicies(new UpdateOrganizationDomainPolicyHandler())
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

  @CheckPolicies(new DeleteOrganizationDomainPolicyHandler())
  @Delete('account/organizations/:id')
  deleteOrganization(@Param('id') id: string) {
    return this.organizationGrpcService.DeleteOrganization({ id });
  }
}
