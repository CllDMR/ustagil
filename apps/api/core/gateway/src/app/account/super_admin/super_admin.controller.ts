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
import { ACCOUNT_SUPER_ADMIN_MS_GRPC } from '@ustagil/api/core/account/constant';
import {
  AccountSuperAdminCreateOneRequestBodyDto,
  AccountSuperAdminReadAllRequestQueryDto,
  AccountSuperAdminUpdateOneRequestBodyDto,
  IAccountSuperAdminGrpcService,
} from '@ustagil/api/core/account/typing';
import {
  AccountSuperAdminCreateOneTransformInterceptor,
  AccountSuperAdminDeleteOneTransformInterceptor,
  AccountSuperAdminReadAllTransformInterceptor,
  AccountSuperAdminReadOneTransformInterceptor,
  AccountSuperAdminUpdateOneTransformInterceptor,
} from '@ustagil/api/core/account/util';
import {
  AccountSuperAdminDomainCreatePolicyRule,
  AccountSuperAdminDomainDeletePolicyRule,
  AccountSuperAdminDomainReadPolicyRule,
  AccountSuperAdminDomainUpdatePolicyRule,
  CheckPolicies,
  PoliciesGuard,
} from '@ustagil/api/core/casl';
import {
  AllExceptionsFilter,
  TimeoutErrorExceptionsFilter,
} from '@ustagil/api/core/common/typing';
import { JwtAuthGuard } from '@ustagil/api/core/common/util';

@UseGuards(ThrottlerGuard, JwtAuthGuard, PoliciesGuard)
@UseFilters(AllExceptionsFilter, TimeoutErrorExceptionsFilter)
@Controller()
export class AccountSuperAdminController implements OnModuleInit {
  private accountSuperAdminGrpcService: IAccountSuperAdminGrpcService;

  constructor(
    @Inject(ACCOUNT_SUPER_ADMIN_MS_GRPC)
    private readonly accountSuperAdminMSGrpcClient: ClientGrpc
  ) {}

  onModuleInit() {
    this.accountSuperAdminGrpcService =
      this.accountSuperAdminMSGrpcClient.getService<IAccountSuperAdminGrpcService>(
        'AccountSuperAdminService'
      );
  }

  @UseInterceptors(AccountSuperAdminCreateOneTransformInterceptor)
  @CheckPolicies(new AccountSuperAdminDomainCreatePolicyRule())
  @Post('account/super_admins')
  postSuperAdmin(@Body() dto: AccountSuperAdminCreateOneRequestBodyDto) {
    return this.accountSuperAdminGrpcService.CreateAccountSuperAdmin(dto);
  }

  @UseInterceptors(AccountSuperAdminReadAllTransformInterceptor)
  @CheckPolicies(new AccountSuperAdminDomainReadPolicyRule())
  @Get('account/super_admins')
  getSuperAdmins(@Query() dto: AccountSuperAdminReadAllRequestQueryDto) {
    return this.accountSuperAdminGrpcService.ListAccountSuperAdmins(dto);
  }

  @UseInterceptors(AccountSuperAdminReadOneTransformInterceptor)
  @CheckPolicies(new AccountSuperAdminDomainReadPolicyRule())
  @Get('account/super_admins/:id')
  getSuperAdmin(@Param('id') id: string) {
    return this.accountSuperAdminGrpcService.GetAccountSuperAdmin({ id });
  }

  @UseInterceptors(AccountSuperAdminUpdateOneTransformInterceptor)
  @CheckPolicies(new AccountSuperAdminDomainUpdatePolicyRule())
  @Patch('account/super_admins/:id')
  patchSuperAdmin(
    @Param('id') id: string,
    @Body() dto: AccountSuperAdminUpdateOneRequestBodyDto
  ) {
    return this.accountSuperAdminGrpcService.UpdateAccountSuperAdmin({
      id,
      ...dto,
    });
  }

  @UseInterceptors(AccountSuperAdminDeleteOneTransformInterceptor)
  @CheckPolicies(new AccountSuperAdminDomainDeletePolicyRule())
  @Delete('account/super_admins/:id')
  deleteSuperAdmin(@Param('id') id: string) {
    return this.accountSuperAdminGrpcService.DeleteAccountSuperAdmin({ id });
  }
}
