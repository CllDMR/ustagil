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
import { IUserGrpcController } from '@ustagil/api/core/account/typing';
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
  @Inject('ACCOUNT_USER_GRPC_SERVICE')
  private userMSGrpcClient: ClientGrpc;

  onModuleInit() {
    this.userGrpcService =
      this.userMSGrpcClient.getService<IUserGrpcController>('UserService');
  }

  @Post('account/users')
  postUser(@Body() dto: UserCreateOneBodyDto) {
    return this.userGrpcService.CreateUser({ user: dto });
  }

  @Get('account/users')
  getUsers(@Query() dto: UserFindAllQueryDto) {
    return this.userGrpcService.ListUsers({ page_size: dto.page_size ?? 10 });
  }

  @Get('account/users/:id')
  getUser(@Param('id') id: string) {
    return this.userGrpcService.GetUser({ id });
  }

  @Patch('account/users/:id')
  patchUser(@Param('id') id: string, @Body() dto: UserUpdateOneBodyDto) {
    return this.userGrpcService.UpdateUser({ id, user: dto });
  }

  @Delete('account/users/:id')
  deleteUser(@Param('id') id: string) {
    return this.userGrpcService.DeleteUser({ id });
  }
}
