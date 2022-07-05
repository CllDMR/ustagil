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
import { ACCOUNT_BASE_MS_GRPC } from '@ustagil/api/core/account/constant';
import {
  AccountBaseCreateOneRequestBodyDto,
  AccountBaseFindAllRequestQueryDto,
  AccountBaseUpdateOneRequestBodyDto,
  IAccountBaseGrpcService,
} from '@ustagil/api/core/account/typing';
import {
  AccountBaseCreateOneTransformInterceptor,
  AccountBaseDeleteOneTransformInterceptor,
  AccountBaseReadAllTransformInterceptor,
  AccountBaseReadOneTransformInterceptor,
  AccountBaseUpdateOneTransformInterceptor,
} from '@ustagil/api/core/account/util';
import {
  AccountBaseDomainCreatePolicyRule,
  AccountBaseDomainDeletePolicyRule,
  AccountBaseDomainReadPolicyRule,
  AccountBaseDomainUpdatePolicyRule,
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
export class AccountBaseController implements OnModuleInit {
  private accountBaseGrpcService: IAccountBaseGrpcService;

  constructor(
    @Inject(ACCOUNT_BASE_MS_GRPC)
    private readonly accountBaseMSGrpcClient: ClientGrpc
  ) {}

  onModuleInit() {
    this.accountBaseGrpcService =
      this.accountBaseMSGrpcClient.getService<IAccountBaseGrpcService>(
        'AccountBaseService'
      );
  }

  @UseInterceptors(AccountBaseCreateOneTransformInterceptor)
  @CheckPolicies(new AccountBaseDomainCreatePolicyRule())
  @Post('account/bases')
  postBase(@Body() dto: AccountBaseCreateOneRequestBodyDto) {
    return this.accountBaseGrpcService.CreateAccountBase(dto);
  }

  @UseInterceptors(AccountBaseReadAllTransformInterceptor)
  @CheckPolicies(new AccountBaseDomainReadPolicyRule())
  @Get('account/bases')
  getBases(@Query() dto: AccountBaseFindAllRequestQueryDto) {
    return this.accountBaseGrpcService.ListAccountBases(dto);
  }

  @UseInterceptors(AccountBaseReadOneTransformInterceptor)
  @CheckPolicies(new AccountBaseDomainReadPolicyRule())
  @Get('account/bases/:id')
  getBase(@Param('id') id: string) {
    return this.accountBaseGrpcService.GetAccountBase({ id });
  }

  @UseInterceptors(AccountBaseUpdateOneTransformInterceptor)
  @CheckPolicies(new AccountBaseDomainUpdatePolicyRule())
  @Patch('account/bases/:id')
  patchBase(
    @Param('id') id: string,
    @Body() dto: AccountBaseUpdateOneRequestBodyDto
  ) {
    return this.accountBaseGrpcService.UpdateAccountBase({ id, ...dto });
  }

  @UseInterceptors(AccountBaseDeleteOneTransformInterceptor)
  @CheckPolicies(new AccountBaseDomainDeletePolicyRule())
  @Delete('account/bases/:id')
  deleteBase(@Param('id') id: string) {
    return this.accountBaseGrpcService.DeleteAccountBase({ id });
  }
}
