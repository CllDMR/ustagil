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
import { ISuperAdminGrpcController } from '@ustagil/api/core/account/typing';
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
  @Inject('ACCOUNT_SUPER_ADMIN_GRPC_SERVICE')
  private superAdminMSGrpcClient: ClientGrpc;

  onModuleInit() {
    this.superAdminGrpcService =
      this.superAdminMSGrpcClient.getService<ISuperAdminGrpcController>(
        'SuperAdminService'
      );
  }

  @Post('account/super_admins')
  postSuperAdmin(@Body() dto: SuperAdminCreateOneBodyDto) {
    return this.superAdminGrpcService.CreateSuperAdmin({ super_admin: dto });
  }

  @Get('account/super_admins')
  getSuperAdmins(@Query() dto: SuperAdminFindAllQueryDto) {
    return this.superAdminGrpcService.ListSuperAdmins({
      page_size: dto.page_size ?? 10,
    });
  }

  @Get('account/super_admins/:id')
  getSuperAdmin(@Param('id') id: string) {
    return this.superAdminGrpcService.GetSuperAdmin({ id });
  }

  @Patch('account/super_admins/:id')
  patchSuperAdmin(
    @Param('id') id: string,
    @Body() dto: SuperAdminUpdateOneBodyDto
  ) {
    return this.superAdminGrpcService.UpdateSuperAdmin({
      id,
      super_admin: dto,
    });
  }

  @Delete('account/super_admins/:id')
  deleteSuperAdmin(@Param('id') id: string) {
    return this.superAdminGrpcService.DeleteSuperAdmin({ id });
  }
}
