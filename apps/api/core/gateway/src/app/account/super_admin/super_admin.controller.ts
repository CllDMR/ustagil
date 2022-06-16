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
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { ThrottlerGuard } from '@nestjs/throttler';
import { SUPER_ADMIN_MS_GRPC } from '@ustagil/api/core/account/constant';
import { ISuperAdminGrpcController } from '@ustagil/api/core/account/typing';
import {
  CheckPolicies,
  PoliciesGuard,
  SuperAdminDomainCreatePolicyRule,
  SuperAdminDomainDeletePolicyRule,
  SuperAdminDomainReadPolicyRule,
  SuperAdminDomainUpdatePolicyRule,
} from '@ustagil/api/core/casl';
import {
  AllExceptionsFilter,
  TimeoutErrorExceptionsFilter,
} from '@ustagil/api/core/common/typing';
import { JwtAuthGuard } from '@ustagil/api/core/common/util';
import {
  SuperAdminCreateOneBodyDto,
  SuperAdminFindAllQueryDto,
  SuperAdminUpdateOneBodyDto,
} from './dtos';

@UseGuards(ThrottlerGuard, JwtAuthGuard, PoliciesGuard)
@UseFilters(AllExceptionsFilter, TimeoutErrorExceptionsFilter)
@Controller()
export class SuperAdminController implements OnModuleInit {
  private superAdminGrpcService: ISuperAdminGrpcController;

  constructor(
    @Inject(SUPER_ADMIN_MS_GRPC)
    private readonly superAdminMSGrpcClient: ClientGrpc
  ) {}

  onModuleInit() {
    this.superAdminGrpcService =
      this.superAdminMSGrpcClient.getService<ISuperAdminGrpcController>(
        'SuperAdminService'
      );
  }

  @CheckPolicies(new SuperAdminDomainCreatePolicyRule())
  @Post('account/super_admins')
  postSuperAdmin(@Body() dto: SuperAdminCreateOneBodyDto) {
    return this.superAdminGrpcService.CreateSuperAdmin(dto);
  }

  @CheckPolicies(new SuperAdminDomainReadPolicyRule())
  @Get('account/super_admins')
  getSuperAdmins(@Query() dto: SuperAdminFindAllQueryDto) {
    return this.superAdminGrpcService.ListSuperAdmins({
      page_size: dto.page_size ?? 10,
    });
  }

  @CheckPolicies(new SuperAdminDomainReadPolicyRule())
  @Get('account/super_admins/:id')
  getSuperAdmin(@Param('id') id: string) {
    return this.superAdminGrpcService.GetSuperAdmin({ id });
  }

  @CheckPolicies(new SuperAdminDomainUpdatePolicyRule())
  @Patch('account/super_admins/:id')
  patchSuperAdmin(
    @Param('id') id: string,
    @Body() dto: SuperAdminUpdateOneBodyDto
  ) {
    return this.superAdminGrpcService.UpdateSuperAdmin({
      id,
      ...dto,
    });
  }

  @CheckPolicies(new SuperAdminDomainDeletePolicyRule())
  @Delete('account/super_admins/:id')
  deleteSuperAdmin(@Param('id') id: string) {
    return this.superAdminGrpcService.DeleteSuperAdmin({ id });
  }
}
