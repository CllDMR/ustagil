import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';
import {
  IUserGrpcController,
  UserCreateOneRequest,
  UserDeleteOneRequest,
  UserFindAllRequest,
  UserFindOneByEmailRequest,
  UserFindOneRequest,
  UserUpdateOneRequest,
} from '@ustagil/api/core/account/typing';
import { from } from 'rxjs';
import {
  UserCreateOneCommand,
  UserDeleteOneCommand,
  UserUpdateOneCommand,
} from './command';
import {
  UserReadAllQuery,
  UserReadOneByEmailQuery,
  UserReadOneQuery,
} from './query';

@Controller()
export class UserController implements IUserGrpcController {
  constructor(
    private readonly commandBus: CommandBus<
      UserCreateOneCommand | UserDeleteOneCommand | UserUpdateOneCommand
    >,
    private readonly queryBus: QueryBus<
      UserReadAllQuery | UserReadOneByEmailQuery | UserReadOneQuery
    >
  ) {}

  @GrpcMethod('UserService')
  ListUsers(data: UserFindAllRequest) {
    return from(this.queryBus.execute(new UserReadAllQuery(data)));
  }

  @GrpcMethod('UserService')
  GetUserByEmail(data: UserFindOneByEmailRequest) {
    return from(this.queryBus.execute(new UserReadOneByEmailQuery(data)));
  }

  @GrpcMethod('UserService')
  GetUser(data: UserFindOneRequest) {
    return from(this.queryBus.execute(new UserReadOneQuery(data)));
  }

  @GrpcMethod('UserService')
  CreateUser(data: UserCreateOneRequest) {
    return from(this.commandBus.execute(new UserCreateOneCommand(data)));
  }

  @GrpcMethod('UserService')
  UpdateUser(data: UserUpdateOneRequest) {
    return from(
      this.commandBus.execute(
        new UserUpdateOneCommand({
          id: data.id,
          ...data,
        })
      )
    );
  }

  @GrpcMethod('UserService')
  DeleteUser(data: UserDeleteOneRequest) {
    return from(this.commandBus.execute(new UserDeleteOneCommand(data)));
  }
}
