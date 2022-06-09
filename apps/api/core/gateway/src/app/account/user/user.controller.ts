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
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { USER_MS_GPRC } from '@ustagil/api/core/account/constant';
import { IUserGrpcController } from '@ustagil/api/core/account/typing';
import {
  CheckPolicies,
  CreateUserDomainPolicyHandler,
  DeleteUserDomainPolicyHandler,
  ReadUserDomainPolicyHandler,
  UpdateUserDomainPolicyHandler,
} from '@ustagil/api/core/casl';
import {
  AllExceptionsFilter,
  TimeoutErrorExceptionsFilter,
} from '@ustagil/api/core/common/typing';
import {
  UserCreateOneBodyDto,
  UserFindAllQueryDto,
  UserUpdateOneBodyDto,
} from './dtos';

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

  @CheckPolicies(new CreateUserDomainPolicyHandler())
  @Post('account/users')
  postUser(@Body() dto: UserCreateOneBodyDto) {
    return this.userGrpcService.CreateUser({ user: dto });
  }

  @CheckPolicies(new ReadUserDomainPolicyHandler())
  @Get('account/users')
  getUsers(@Query() dto: UserFindAllQueryDto) {
    return this.userGrpcService.ListUsers({ page_size: dto.page_size ?? 10 });
  }

  @CheckPolicies(new ReadUserDomainPolicyHandler())
  @Get('account/users/:id')
  getUser(@Param('id') id: string) {
    return this.userGrpcService.GetUser({ id });
  }

  @CheckPolicies(new UpdateUserDomainPolicyHandler())
  @Patch('account/users/:id')
  patchUser(@Param('id') id: string, @Body() dto: UserUpdateOneBodyDto) {
    return this.userGrpcService.UpdateUser({ id, user: dto });
  }

  @CheckPolicies(new DeleteUserDomainPolicyHandler())
  @Delete('account/users/:id')
  deleteUser(@Param('id') id: string) {
    return this.userGrpcService.DeleteUser({ id });
  }
}
