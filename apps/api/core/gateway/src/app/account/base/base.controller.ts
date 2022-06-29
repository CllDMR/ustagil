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
import { BASE_MS_GRPC } from '@ustagil/api/core/account/constant';
import {
  BaseCreateOneRequestBodyDto,
  BaseFindAllRequestQueryDto,
  BaseUpdateOneRequestBodyDto,
  IBaseGrpcController,
} from '@ustagil/api/core/account/typing';
import {
  BaseCreateOneTransformInterceptor,
  BaseDeleteOneTransformInterceptor,
  BaseFindAllTransformInterceptor,
  BaseFindOneTransformInterceptor,
  BaseUpdateOneTransformInterceptor,
} from '@ustagil/api/core/account/util';
import {
  BaseDomainCreatePolicyRule,
  BaseDomainDeletePolicyRule,
  BaseDomainReadPolicyRule,
  BaseDomainUpdatePolicyRule,
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
export class BaseController implements OnModuleInit {
  private baseGrpcService: IBaseGrpcController;

  constructor(
    @Inject(BASE_MS_GRPC) private readonly baseMSGrpcClient: ClientGrpc
  ) {}

  onModuleInit() {
    this.baseGrpcService =
      this.baseMSGrpcClient.getService<IBaseGrpcController>('BaseService');
  }

  @UseInterceptors(BaseCreateOneTransformInterceptor)
  @CheckPolicies(new BaseDomainCreatePolicyRule())
  @Post('account/bases')
  postBase(@Body() dto: BaseCreateOneRequestBodyDto) {
    return this.baseGrpcService.CreateBase(dto);
  }

  @UseInterceptors(BaseFindAllTransformInterceptor)
  @CheckPolicies(new BaseDomainReadPolicyRule())
  @Get('account/bases')
  getBases(@Query() dto: BaseFindAllRequestQueryDto) {
    return this.baseGrpcService.ListBases(dto);
  }

  @UseInterceptors(BaseFindOneTransformInterceptor)
  @CheckPolicies(new BaseDomainReadPolicyRule())
  @Get('account/bases/:id')
  getBase(@Param('id') id: string) {
    return this.baseGrpcService.GetBase({ id });
  }

  @UseInterceptors(BaseUpdateOneTransformInterceptor)
  @CheckPolicies(new BaseDomainUpdatePolicyRule())
  @Patch('account/bases/:id')
  patchBase(@Param('id') id: string, @Body() dto: BaseUpdateOneRequestBodyDto) {
    return this.baseGrpcService.UpdateBase({ id, ...dto });
  }

  @UseInterceptors(BaseDeleteOneTransformInterceptor)
  @CheckPolicies(new BaseDomainDeletePolicyRule())
  @Delete('account/bases/:id')
  deleteBase(@Param('id') id: string) {
    return this.baseGrpcService.DeleteBase({ id });
  }
}
