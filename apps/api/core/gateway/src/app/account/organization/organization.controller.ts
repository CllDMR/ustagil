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
import { ACCOUNT_ORGANIZATION_MS_GRPC } from '@ustagil/api/core/account/constant';
import {
  AccountOrganizationCreateOneRequestBodyDto,
  AccountOrganizationReadAllRequestQueryDto,
  AccountOrganizationUpdateOneRequestBodyDto,
  IAccountOrganizationGrpcService,
} from '@ustagil/api/core/account/typing';
import {
  AccountOrganizationCreateOneTransformInterceptor,
  AccountOrganizationDeleteOneTransformInterceptor,
  AccountOrganizationReadAllTransformInterceptor,
  AccountOrganizationReadOneTransformInterceptor,
  AccountOrganizationUpdateOneTransformInterceptor,
} from '@ustagil/api/core/account/util';
import {
  AccountOrganizationDomainCreatePolicyRule,
  AccountOrganizationDomainDeletePolicyRule,
  AccountOrganizationDomainReadPolicyRule,
  AccountOrganizationDomainUpdatePolicyRule,
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
export class AccountOrganizationController implements OnModuleInit {
  private accountOrganizationGrpcService: IAccountOrganizationGrpcService;

  constructor(
    @Inject(ACCOUNT_ORGANIZATION_MS_GRPC)
    private readonly accountOrganizationMSGrpcClient: ClientGrpc
  ) {}

  onModuleInit() {
    this.accountOrganizationGrpcService =
      this.accountOrganizationMSGrpcClient.getService<IAccountOrganizationGrpcService>(
        'AccountOrganizationService'
      );
  }

  @UseInterceptors(AccountOrganizationCreateOneTransformInterceptor)
  @CheckPolicies(new AccountOrganizationDomainCreatePolicyRule())
  @Post('account/organizations')
  postOrganization(@Body() dto: AccountOrganizationCreateOneRequestBodyDto) {
    return this.accountOrganizationGrpcService.CreateAccountOrganization(dto);
  }

  @UseInterceptors(AccountOrganizationReadAllTransformInterceptor)
  @CheckPolicies(new AccountOrganizationDomainReadPolicyRule())
  @Get('account/organizations')
  getOrganizations(@Query() dto: AccountOrganizationReadAllRequestQueryDto) {
    return this.accountOrganizationGrpcService.ListAccountOrganizations(dto);
  }

  @UseInterceptors(AccountOrganizationReadOneTransformInterceptor)
  @CheckPolicies(new AccountOrganizationDomainReadPolicyRule())
  @Get('account/organizations/:id')
  getOrganization(@Param('id') id: string) {
    return this.accountOrganizationGrpcService.GetAccountOrganization({ id });
  }

  @UseInterceptors(AccountOrganizationUpdateOneTransformInterceptor)
  @CheckPolicies(new AccountOrganizationDomainUpdatePolicyRule())
  @Patch('account/organizations/:id')
  patchOrganization(
    @Param('id') id: string,
    @Body() dto: AccountOrganizationUpdateOneRequestBodyDto
  ) {
    return this.accountOrganizationGrpcService.UpdateAccountOrganization({
      id,
      ...dto,
    });
  }

  @UseInterceptors(AccountOrganizationDeleteOneTransformInterceptor)
  @CheckPolicies(new AccountOrganizationDomainDeletePolicyRule())
  @Delete('account/organizations/:id')
  deleteOrganization(@Param('id') id: string) {
    return this.accountOrganizationGrpcService.DeleteAccountOrganization({
      id,
    });
  }
}
