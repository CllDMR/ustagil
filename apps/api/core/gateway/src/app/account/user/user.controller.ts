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
import { USER_MS_GPRC } from '@ustagil/api/core/account/constant';
import { IUserGrpcController } from '@ustagil/api/core/account/typing';
import {
  UserCreateOneTransformInterceptor,
  UserDeleteOneTransformInterceptor,
  UserFindAllTransformInterceptor,
  UserFindOneTransformInterceptor,
  UserUpdateOneTransformInterceptor,
} from '@ustagil/api/core/account/util';
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

  @UseInterceptors(UserCreateOneTransformInterceptor)
  @CheckPolicies(new UserDomainCreatePolicyRule())
  @Post('account/users')
  postUser(@Body() dto: UserCreateOneBodyDto) {
    return this.userGrpcService.CreateUser(dto);
  }

  @UseInterceptors(UserFindAllTransformInterceptor)
  @CheckPolicies(new UserDomainReadPolicyRule())
  @Get('account/users')
  getUsers(@Query() dto: UserFindAllQueryDto) {
    return this.userGrpcService.ListUsers(dto);
  }

  @UseInterceptors(UserFindOneTransformInterceptor)
  @CheckPolicies(new UserDomainReadPolicyRule())
  @Get('account/users/:id')
  getUser(@Param('id') id: string) {
    return this.userGrpcService.GetUser({ id });
  }

  @UseInterceptors(UserUpdateOneTransformInterceptor)
  @CheckPolicies(new UserDomainUpdatePolicyRule())
  @Patch('account/users/:id')
  patchUser(@Param('id') id: string, @Body() dto: UserUpdateOneBodyDto) {
    return this.userGrpcService.UpdateUser({ id, ...dto });
  }

  @UseInterceptors(UserDeleteOneTransformInterceptor)
  @CheckPolicies(new UserDomainDeletePolicyRule())
  @Delete('account/users/:id')
  deleteUser(@Param('id') id: string) {
    return this.userGrpcService.DeleteUser({ id });
  }
}
