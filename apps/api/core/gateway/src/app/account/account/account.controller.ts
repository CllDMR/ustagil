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
import { ACCOUNT_MS_GRPC } from '@ustagil/api/core/account/constant';
import {
  AccountCreateOneRequestBodyDto,
  AccountFindAllRequestQueryDto,
  AccountUpdateOneRequestBodyDto,
  IAccountGrpcController,
} from '@ustagil/api/core/account/typing';
import {
  AccountCreateOneTransformInterceptor,
  AccountDeleteOneTransformInterceptor,
  AccountFindAllTransformInterceptor,
  AccountFindOneTransformInterceptor,
  AccountUpdateOneTransformInterceptor,
} from '@ustagil/api/core/account/util';
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

  @UseInterceptors(AccountCreateOneTransformInterceptor)
  @CheckPolicies(new AccountDomainCreatePolicyRule())
  @Post('accounts')
  postAccount(@Body() dto: AccountCreateOneRequestBodyDto) {
    return this.accountGrpcService.CreateAccount(dto);
  }

  @UseInterceptors(AccountFindAllTransformInterceptor)
  @CheckPolicies(new AccountDomainReadPolicyRule())
  @Get('accounts')
  getAccounts(@Query() dto: AccountFindAllRequestQueryDto) {
    return this.accountGrpcService.ListAccounts(dto);
  }

  @UseInterceptors(AccountFindOneTransformInterceptor)
  @CheckPolicies(new AccountDomainReadPolicyRule())
  @Get('accounts/:id')
  getAccount(@Param('id') id: string) {
    return this.accountGrpcService.GetAccount({ id });
  }

  @UseInterceptors(AccountUpdateOneTransformInterceptor)
  @CheckPolicies(new AccountDomainUpdatePolicyRule())
  @Patch('accounts/:id')
  patchAccount(
    @Param('id') id: string,
    @Body() dto: AccountUpdateOneRequestBodyDto
  ) {
    return this.accountGrpcService.UpdateAccount({ id, ...dto });
  }

  @UseInterceptors(AccountDeleteOneTransformInterceptor)
  @CheckPolicies(new AccountDomainDeletePolicyRule())
  @Delete('accounts/:id')
  deleteAccount(@Param('id') id: string) {
    return this.accountGrpcService.DeleteAccount({ id });
  }
}
