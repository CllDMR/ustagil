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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { ThrottlerGuard } from '@nestjs/throttler';
import { ORGANIZATION_MS_GRPC } from '@ustagil/api/core/account/constant';
import { IOrganizationGrpcController } from '@ustagil/api/core/account/typing';
import {
  OrganizationCreateOneTransformInterceptor,
  OrganizationDeleteOneTransformInterceptor,
  OrganizationFindAllTransformInterceptor,
  OrganizationFindOneTransformInterceptor,
  OrganizationUpdateOneTransformInterceptor,
} from '@ustagil/api/core/account/util';
import {
  CheckPolicies,
  OrganizationDomainCreatePolicyRule,
  OrganizationDomainDeletePolicyRule,
  OrganizationDomainReadPolicyRule,
  OrganizationDomainUpdatePolicyRule,
  PoliciesGuard,
} from '@ustagil/api/core/casl';
import {
  AllExceptionsFilter,
  TimeoutErrorExceptionsFilter,
} from '@ustagil/api/core/common/typing';
import { JwtAuthGuard } from '@ustagil/api/core/common/util';
import {
  OrganizationCreateOneBodyDto,
  OrganizationFindAllQueryDto,
  OrganizationUpdateOneBodyDto,
} from './dtos';

@UseGuards(ThrottlerGuard, JwtAuthGuard, PoliciesGuard)
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

  @UseInterceptors(OrganizationCreateOneTransformInterceptor)
  @CheckPolicies(new OrganizationDomainCreatePolicyRule())
  @Post('account/organizations')
  postOrganization(@Body() dto: OrganizationCreateOneBodyDto) {
    return this.organizationGrpcService.CreateOrganization(dto);
  }

  @UseInterceptors(OrganizationFindAllTransformInterceptor)
  @CheckPolicies(new OrganizationDomainReadPolicyRule())
  @Get('account/organizations')
  getOrganizations(@Query() dto: OrganizationFindAllQueryDto) {
    return this.organizationGrpcService.ListOrganizations(dto);
  }

  @UseInterceptors(OrganizationFindOneTransformInterceptor)
  @CheckPolicies(new OrganizationDomainReadPolicyRule())
  @Get('account/organizations/:id')
  getOrganization(@Param('id') id: string) {
    return this.organizationGrpcService.GetOrganization({ id });
  }

  @UseInterceptors(OrganizationUpdateOneTransformInterceptor)
  @CheckPolicies(new OrganizationDomainUpdatePolicyRule())
  @Patch('account/organizations/:id')
  patchOrganization(
    @Param('id') id: string,
    @Body() dto: OrganizationUpdateOneBodyDto
  ) {
    return this.organizationGrpcService.UpdateOrganization({
      id,
      ...dto,
    });
  }

  @UseInterceptors(OrganizationDeleteOneTransformInterceptor)
  @CheckPolicies(new OrganizationDomainDeletePolicyRule())
  @Delete('account/organizations/:id')
  deleteOrganization(@Param('id') id: string) {
    return this.organizationGrpcService.DeleteOrganization({ id });
  }
}
