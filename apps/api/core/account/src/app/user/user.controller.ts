import { Metadata } from '@grpc/grpc-js';
import { Controller, UseFilters } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';
import {
  CreateUserRequest,
  DeleteUserRequest,
  GetUserRequest,
  IUserGrpcController,
  ListUsersRequest,
  ListUsersResponse,
  UpdateUserRequest,
  UserDomain,
} from '@ustagil/api/core/account/typing';
import {
  AllCustomRpcExceptionsFilter,
  TimeoutErrorRpcExceptionsFilter,
} from '@ustagil/api/core/common/typing';
import {
  UserCreateOneCommand,
  UserDeleteOneCommand,
  UserUpdateOneCommand,
} from './command';
import { UserReadAllQuery, UserReadOneQuery } from './query';

@UseFilters(AllCustomRpcExceptionsFilter, TimeoutErrorRpcExceptionsFilter)
@Controller()
export class UserController implements IUserGrpcController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @GrpcMethod('UserService')
  async listUsers(
    data: ListUsersRequest,
    _metadata: Metadata
  ): Promise<ListUsersResponse> {
    const users = await this.queryBus.execute(new UserReadAllQuery(data));

    return {
      users,
      next_page_token: '',
    };
  }

  @GrpcMethod('UserService')
  async getUser(
    data: GetUserRequest,
    _metadata: Metadata
  ): Promise<UserDomain> {
    return await this.queryBus.execute(new UserReadOneQuery(data));
  }

  @GrpcMethod('UserService')
  async createUser(
    data: CreateUserRequest,
    _metadata: Metadata
  ): Promise<UserDomain> {
    return await this.commandBus.execute(new UserCreateOneCommand(data.user));
  }

  @GrpcMethod('UserService')
  async updateUser(
    data: UpdateUserRequest,
    _metadata: Metadata
  ): Promise<UserDomain> {
    return await this.commandBus.execute(
      new UserUpdateOneCommand({
        id: data.id,
        ...data.user,
      })
    );
  }

  @GrpcMethod('UserService')
  async deleteUser(
    data: DeleteUserRequest,
    _metadata: Metadata
  ): Promise<void> {
    return await this.commandBus.execute(new UserDeleteOneCommand(data));
  }
}
