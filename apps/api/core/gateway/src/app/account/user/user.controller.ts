import { Metadata } from '@grpc/grpc-js';
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
    return this.userGrpcService.createUser({ user: dto }, new Metadata());
  }

  @Get('account/users')
  getUsers(@Query() dto: UserFindAllQueryDto) {
    return this.userGrpcService.listUsers(
      { page_size: dto.page_size ?? 10, page_token: dto.page_token ?? '' },
      new Metadata()
    );
  }

  @Get('account/users/:user_id')
  getUser(@Param('user_id') user_id: string) {
    return this.userGrpcService.getUser({ id: user_id }, new Metadata());
  }

  @Patch('account/users/:user_id')
  patchUser(
    @Param('user_id') user_id: string,
    @Body() dto: UserUpdateOneBodyDto
  ) {
    return this.userGrpcService.updateUser(
      { id: user_id, user: dto },
      new Metadata()
    );
  }

  @Delete('account/users/:user_id')
  deleteUser(@Param('user_id') user_id: string) {
    return this.userGrpcService.deleteUser({ id: user_id }, new Metadata());
  }
}
