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
import {
  AccountCreateOneRequestBodyDto,
  AccountCreateOneResponseBodyDto,
  AccountFindAllRequestQueryDto,
  AccountFindAllResponseBodyDto,
  AccountFindOneResponseBodyDto,
  AccountResponseDomainFactory,
  AccountUpdateOneRequestBodyDto,
  AccountUpdateOneResponseBodyDto,
  IAccountGrpcController,
} from '@ustagil/api/core/account/typing';
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
    @Inject(ACCOUNT_MS_GRPC) private readonly accountMSGrpcClient: ClientGrpc,
    private accountResponseDomainFactory: AccountResponseDomainFactory
  ) {}

  onModuleInit() {
    this.accountGrpcService =
      this.accountMSGrpcClient.getService<IAccountGrpcController>(
        'AccountService'
      );
  }

  @CheckPolicies(new AccountDomainCreatePolicyRule())
  @Post('accounts')
  async postAccount(
    @Body() dto: AccountCreateOneRequestBodyDto
  ): Promise<AccountCreateOneResponseBodyDto> {
    const data = await this.accountGrpcService.CreateAccount(dto);
    return this.accountResponseDomainFactory.createResponseForCreateOne(data);
  }

  @CheckPolicies(new AccountDomainReadPolicyRule())
  @Get('accounts')
  async getAccounts(
    @Query() dto: AccountFindAllRequestQueryDto
  ): Promise<AccountFindAllResponseBodyDto> {
    const data = await this.accountGrpcService.ListAccounts(dto);
    return this.accountResponseDomainFactory.createResponseForFindAll(data);
  }

  @CheckPolicies(new AccountDomainReadPolicyRule())
  @Get('accounts/:id')
  async getAccount(
    @Param('id') id: string
  ): Promise<AccountFindOneResponseBodyDto> {
    const data = await this.accountGrpcService.GetAccount({ id });
    return this.accountResponseDomainFactory.createResponseForFindOne(data);
  }

  @CheckPolicies(new AccountDomainUpdatePolicyRule())
  @Patch('accounts/:id')
  async patchAccount(
    @Param('id') id: string,
    @Body() dto: AccountUpdateOneRequestBodyDto
  ): Promise<AccountUpdateOneResponseBodyDto> {
    const data = await this.accountGrpcService.UpdateAccount({ id, ...dto });
    return this.accountResponseDomainFactory.createResponseForUpdateOne(data);
  }

  @CheckPolicies(new AccountDomainDeletePolicyRule())
  @Delete('accounts/:id')
  async deleteAccount(@Param('id') id: string): Promise<void> {
    return await this.accountGrpcService.DeleteAccount({ id });
    // return this.accountResponseDomainFactory.createResponseForDeleteOne(data);
  }
}
