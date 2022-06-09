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
  CheckPolicies,
  CreateAccountDomainPolicyHandler,
  DeleteAccountDomainPolicyHandler,
  PoliciesGuard,
  ReadAccountDomainPolicyHandler,
  UpdateAccountDomainPolicyHandler,
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

  @CheckPolicies(new CreateAccountDomainPolicyHandler())
  @Post('accounts')
  postAccount(@Body() dto: AccountCreateOneBodyDto) {
    return this.accountGrpcService.CreateAccount(dto);
  }

  @CheckPolicies(new ReadAccountDomainPolicyHandler())
  @Get('accounts')
  getAccounts(@Query() dto: AccountFindAllQueryDto) {
    return this.accountGrpcService.ListAccounts(dto);
  }

  @CheckPolicies(new ReadAccountDomainPolicyHandler())
  @Get('accounts/:id')
  getAccount(@Param('id') id: string) {
    return this.accountGrpcService.GetAccount({ id });
  }

  @CheckPolicies(new UpdateAccountDomainPolicyHandler())
  @Patch('accounts/:id')
  patchAccount(@Param('id') id: string, @Body() dto: AccountUpdateOneBodyDto) {
    return this.accountGrpcService.UpdateAccount({ id, ...dto });
  }

  @CheckPolicies(new DeleteAccountDomainPolicyHandler())
  @Delete('accounts/:id')
  deleteAccount(@Param('id') id: string) {
    return this.accountGrpcService.DeleteAccount({ id });
  }
}
