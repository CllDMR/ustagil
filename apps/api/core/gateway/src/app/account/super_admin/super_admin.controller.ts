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
import { SUPER_ADMIN_MS_GRPC } from '@ustagil/api/core/account/constant';
import {
  ISuperAdminGrpcController,
  SuperAdminCreateOneRequestBodyDto,
  SuperAdminFindAllRequestQueryDto,
  SuperAdminUpdateOneRequestBodyDto,
} from '@ustagil/api/core/account/typing';
import {
  SuperAdminCreateOneTransformInterceptor,
  SuperAdminDeleteOneTransformInterceptor,
  SuperAdminFindAllTransformInterceptor,
  SuperAdminFindOneTransformInterceptor,
  SuperAdminUpdateOneTransformInterceptor,
} from '@ustagil/api/core/account/util';
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

  @UseInterceptors(SuperAdminCreateOneTransformInterceptor)
  @CheckPolicies(new SuperAdminDomainCreatePolicyRule())
  @Post('account/super_admins')
  postSuperAdmin(@Body() dto: SuperAdminCreateOneRequestBodyDto) {
    return this.superAdminGrpcService.CreateSuperAdmin(dto);
  }

  @UseInterceptors(SuperAdminFindAllTransformInterceptor)
  @CheckPolicies(new SuperAdminDomainReadPolicyRule())
  @Get('account/super_admins')
  getSuperAdmins(@Query() dto: SuperAdminFindAllRequestQueryDto) {
    return this.superAdminGrpcService.ListSuperAdmins(dto);
  }

  @UseInterceptors(SuperAdminFindOneTransformInterceptor)
  @CheckPolicies(new SuperAdminDomainReadPolicyRule())
  @Get('account/super_admins/:id')
  getSuperAdmin(@Param('id') id: string) {
    return this.superAdminGrpcService.GetSuperAdmin({ id });
  }

  @UseInterceptors(SuperAdminUpdateOneTransformInterceptor)
  @CheckPolicies(new SuperAdminDomainUpdatePolicyRule())
  @Patch('account/super_admins/:id')
  patchSuperAdmin(
    @Param('id') id: string,
    @Body() dto: SuperAdminUpdateOneRequestBodyDto
  ) {
    return this.superAdminGrpcService.UpdateSuperAdmin({
      id,
      ...dto,
    });
  }

  @UseInterceptors(SuperAdminDeleteOneTransformInterceptor)
  @CheckPolicies(new SuperAdminDomainDeletePolicyRule())
  @Delete('account/super_admins/:id')
  deleteSuperAdmin(@Param('id') id: string) {
    return this.superAdminGrpcService.DeleteSuperAdmin({ id });
  }
}
