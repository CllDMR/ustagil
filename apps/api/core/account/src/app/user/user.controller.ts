import { Controller } from '@nestjs/common';
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
  UserCreateOneCommand,
  UserDeleteOneCommand,
  UserUpdateOneCommand,
} from './command';
import { UserReadAllQuery, UserReadOneQuery } from './query';

@Controller()
export class UserController implements IUserGrpcController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @GrpcMethod('UserService')
  async ListUsers(data: ListUsersRequest): Promise<ListUsersResponse> {
    const users = await this.queryBus.execute(new UserReadAllQuery(data));

    return {
      users,
    };
  }

  @GrpcMethod('UserService')
  async GetUser(data: GetUserRequest): Promise<UserDomain> {
    return await this.queryBus.execute(new UserReadOneQuery(data));
  }

  @GrpcMethod('UserService')
  async CreateUser(data: CreateUserRequest): Promise<UserDomain> {
    return await this.commandBus.execute(new UserCreateOneCommand(data.user));
  }

  @GrpcMethod('UserService')
  async UpdateUser(data: UpdateUserRequest): Promise<UserDomain> {
    return await this.commandBus.execute(
      new UserUpdateOneCommand({
        id: data.id,
        ...data.user,
      })
    );
  }

  @GrpcMethod('UserService')
  async DeleteUser(data: DeleteUserRequest): Promise<void> {
    return await this.commandBus.execute(new UserDeleteOneCommand(data));
  }
}
