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
import { SUPER_ADMIN_MS_GRPC } from '@ustagil/api/core/account/constant';
import { ISuperAdminGrpcController } from '@ustagil/api/core/account/typing';
import {
  CheckPolicies,
  CreateSuperAdminDomainPolicyHandler,
  DeleteSuperAdminDomainPolicyHandler,
  ReadSuperAdminDomainPolicyHandler,
  UpdateSuperAdminDomainPolicyHandler,
} from '@ustagil/api/core/casl';
import {
  AllExceptionsFilter,
  TimeoutErrorExceptionsFilter,
} from '@ustagil/api/core/common/typing';
import {
  SuperAdminCreateOneBodyDto,
  SuperAdminFindAllQueryDto,
  SuperAdminUpdateOneBodyDto,
} from './dtos';

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

  @CheckPolicies(new CreateSuperAdminDomainPolicyHandler())
  @Post('account/super_admins')
  postSuperAdmin(@Body() dto: SuperAdminCreateOneBodyDto) {
    return this.superAdminGrpcService.CreateSuperAdmin(dto);
  }

  @CheckPolicies(new ReadSuperAdminDomainPolicyHandler())
  @Get('account/super_admins')
  getSuperAdmins(@Query() dto: SuperAdminFindAllQueryDto) {
    return this.superAdminGrpcService.ListSuperAdmins({
      page_size: dto.page_size ?? 10,
    });
  }

  @CheckPolicies(new ReadSuperAdminDomainPolicyHandler())
  @Get('account/super_admins/:id')
  getSuperAdmin(@Param('id') id: string) {
    return this.superAdminGrpcService.GetSuperAdmin({ id });
  }

  @CheckPolicies(new UpdateSuperAdminDomainPolicyHandler())
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

  @CheckPolicies(new DeleteSuperAdminDomainPolicyHandler())
  @Delete('account/super_admins/:id')
  deleteSuperAdmin(@Param('id') id: string) {
    return this.superAdminGrpcService.DeleteSuperAdmin({ id });
  }
}
