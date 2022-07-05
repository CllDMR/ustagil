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
import { ACCOUNT_USER_MS_GRPC } from '@ustagil/api/core/account/constant';
import {
  AccountUserCreateOneRequestBodyDto,
  AccountUserReadAllRequestQueryDto,
  AccountUserUpdateOneRequestBodyDto,
  IAccountUserGrpcService,
} from '@ustagil/api/core/account/typing';
import {
  AccountUserCreateOneTransformInterceptor,
  AccountUserDeleteOneTransformInterceptor,
  AccountUserReadAllTransformInterceptor,
  AccountUserReadOneTransformInterceptor,
  AccountUserUpdateOneTransformInterceptor,
} from '@ustagil/api/core/account/util';
import {
  AccountUserDomainCreatePolicyRule,
  AccountUserDomainDeletePolicyRule,
  AccountUserDomainReadPolicyRule,
  AccountUserDomainUpdatePolicyRule,
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
export class AccountUserController implements OnModuleInit {
  private accountUserGrpcService: IAccountUserGrpcService;

  constructor(
    @Inject(ACCOUNT_USER_MS_GRPC)
    private readonly accountUserMSGrpcClient: ClientGrpc
  ) {}

  onModuleInit() {
    this.accountUserGrpcService =
      this.accountUserMSGrpcClient.getService<IAccountUserGrpcService>(
        'AccountUserService'
      );
  }

  @UseInterceptors(AccountUserCreateOneTransformInterceptor)
  @CheckPolicies(new AccountUserDomainCreatePolicyRule())
  @Post('account/users')
  postUser(@Body() dto: AccountUserCreateOneRequestBodyDto) {
    return this.accountUserGrpcService.CreateAccountUser(dto);
  }

  @UseInterceptors(AccountUserReadAllTransformInterceptor)
  @CheckPolicies(new AccountUserDomainReadPolicyRule())
  @Get('account/users')
  getUsers(@Query() dto: AccountUserReadAllRequestQueryDto) {
    return this.accountUserGrpcService.ListAccountUsers(dto);
  }

  @UseInterceptors(AccountUserReadOneTransformInterceptor)
  @CheckPolicies(new AccountUserDomainReadPolicyRule())
  @Get('account/users/:id')
  getUser(@Param('id') id: string) {
    return this.accountUserGrpcService.GetAccountUser({ id });
  }

  @UseInterceptors(AccountUserUpdateOneTransformInterceptor)
  @CheckPolicies(new AccountUserDomainUpdatePolicyRule())
  @Patch('account/users/:id')
  patchUser(
    @Param('id') id: string,
    @Body() dto: AccountUserUpdateOneRequestBodyDto
  ) {
    return this.accountUserGrpcService.UpdateAccountUser({ id, ...dto });
  }

  @UseInterceptors(AccountUserDeleteOneTransformInterceptor)
  @CheckPolicies(new AccountUserDomainDeletePolicyRule())
  @Delete('account/users/:id')
  deleteUser(@Param('id') id: string) {
    return this.accountUserGrpcService.DeleteAccountUser({ id });
  }
}
