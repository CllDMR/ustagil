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
import { ACCOUNT_MS_GRPC } from '@ustagil/api/core/account/constant';
import { IAccountGrpcController } from '@ustagil/api/core/account/typing';
import {
  AccountDomainCreatePolicyRule,
  AccountDomainDeletePolicyRule,
  AccountDomainReadPolicyRule,
  AccountDomainUpdatePolicyRule,
  CheckPolicies,
  PoliciesGuard,
} from '@ustagil/api/core/casl';
import {
  AllExceptionsFilter,
  TimeoutErrorExceptionsFilter,
} from '@ustagil/api/core/common/typing';
import { JwtAuthGuard } from '@ustagil/api/core/common/util';
import {
  AccountCreateOneBodyDto,
  AccountFindAllQueryDto,
  AccountUpdateOneBodyDto,
} from './dtos';

@UseGuards(ThrottlerGuard, JwtAuthGuard, PoliciesGuard)
@UseFilters(AllExceptionsFilter, TimeoutErrorExceptionsFilter)
@Controller()
export class AccountController implements OnModuleInit {
  private accountGrpcService: IAccountGrpcController;

  constructor(
    @Inject(ACCOUNT_MS_GRPC) private readonly accountMSGrpcClient: ClientGrpc
  ) {}

  onModuleInit() {
    this.accountGrpcService =
      this.accountMSGrpcClient.getService<IAccountGrpcController>(
        'AccountService'
      );
  }

  @CheckPolicies(new AccountDomainCreatePolicyRule())
  @Post('accounts')
  postAccount(@Body() dto: AccountCreateOneBodyDto) {
    return this.accountGrpcService.CreateAccount(dto);
  }

  @CheckPolicies(new AccountDomainReadPolicyRule())
  @Get('accounts')
  getAccounts(@Query() dto: AccountFindAllQueryDto) {
    return this.accountGrpcService.ListAccounts(dto);
  }

  @CheckPolicies(new AccountDomainReadPolicyRule())
  @Get('accounts/:id')
  getAccount(@Param('id') id: string) {
    return this.accountGrpcService.GetAccount({ id });
  }

  @CheckPolicies(new AccountDomainUpdatePolicyRule())
  @Patch('accounts/:id')
  patchAccount(@Param('id') id: string, @Body() dto: AccountUpdateOneBodyDto) {
    return this.accountGrpcService.UpdateAccount({ id, ...dto });
  }

  @CheckPolicies(new AccountDomainDeletePolicyRule())
  @Delete('accounts/:id')
  deleteAccount(@Param('id') id: string) {
    return this.accountGrpcService.DeleteAccount({ id });
  }
}
