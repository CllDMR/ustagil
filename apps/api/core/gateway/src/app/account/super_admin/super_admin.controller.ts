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
    return this.superAdminGrpcService.createSuperAdmin(
      { super_admin: dto },
      new Metadata()
    );
  }

  @Get('account/super_admins')
  getSuperAdmins(@Query() dto: SuperAdminFindAllQueryDto) {
    return this.superAdminGrpcService.listSuperAdmins(
      { page_size: dto.page_size ?? 10, page_token: dto.page_token ?? '' },
      new Metadata()
    );
  }

  @Get('account/super_admins/:super_admin_id')
  getSuperAdmin(@Param('super_admin_id') super_admin_id: string) {
    return this.superAdminGrpcService.getSuperAdmin(
      { id: super_admin_id },
      new Metadata()
    );
  }

  @Patch('account/super_admins/:super_admin_id')
  patchSuperAdmin(
    @Param('super_admin_id') super_admin_id: string,
    @Body() dto: SuperAdminUpdateOneBodyDto
  ) {
    return this.superAdminGrpcService.updateSuperAdmin(
      { id: super_admin_id, super_admin: dto },
      new Metadata()
    );
  }

  @Delete('account/super_admins/:super_admin_id')
  deleteSuperAdmin(@Param('super_admin_id') super_admin_id: string) {
    return this.superAdminGrpcService.deleteSuperAdmin(
      { id: super_admin_id },
      new Metadata()
    );
  }
}
