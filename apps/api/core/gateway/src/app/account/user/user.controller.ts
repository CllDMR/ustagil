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
import { USER_MS_GPRC } from '@ustagil/api/core/account/constant';
import { IUserGrpcController } from '@ustagil/api/core/account/typing';
import {
  CheckPolicies,
  PoliciesGuard,
  UserDomainCreatePolicyRule,
  UserDomainDeletePolicyRule,
  UserDomainReadPolicyRule,
  UserDomainUpdatePolicyRule,
} from '@ustagil/api/core/casl';
import {
  AllExceptionsFilter,
  TimeoutErrorExceptionsFilter,
} from '@ustagil/api/core/common/typing';
import { JwtAuthGuard } from '@ustagil/api/core/common/util';
import {
  UserCreateOneBodyDto,
  UserFindAllQueryDto,
  UserUpdateOneBodyDto,
} from './dtos';

@UseGuards(ThrottlerGuard, JwtAuthGuard, PoliciesGuard)
@UseFilters(AllExceptionsFilter, TimeoutErrorExceptionsFilter)
@Controller()
export class UserController implements OnModuleInit {
  private userGrpcService: IUserGrpcController;

  constructor(
    @Inject(USER_MS_GPRC)
    private readonly userMSGrpcClient: ClientGrpc
  ) {}

  onModuleInit() {
    this.userGrpcService =
      this.userMSGrpcClient.getService<IUserGrpcController>('UserService');
  }

  @CheckPolicies(new UserDomainCreatePolicyRule())
  @Post('account/users')
  postUser(@Body() dto: UserCreateOneBodyDto) {
    return this.userGrpcService.CreateUser(dto);
  }

  @CheckPolicies(new UserDomainReadPolicyRule())
  @Get('account/users')
  getUsers(@Query() dto: UserFindAllQueryDto) {
    return this.userGrpcService.ListUsers({ page_size: dto.page_size ?? 10 });
  }

  @CheckPolicies(new UserDomainReadPolicyRule())
  @Get('account/users/:id')
  getUser(@Param('id') id: string) {
    return this.userGrpcService.GetUser({ id });
  }

  @CheckPolicies(new UserDomainUpdatePolicyRule())
  @Patch('account/users/:id')
  patchUser(@Param('id') id: string, @Body() dto: UserUpdateOneBodyDto) {
    return this.userGrpcService.UpdateUser({ id, ...dto });
  }

  @CheckPolicies(new UserDomainDeletePolicyRule())
  @Delete('account/users/:id')
  deleteUser(@Param('id') id: string) {
    return this.userGrpcService.DeleteUser({ id });
  }
}
