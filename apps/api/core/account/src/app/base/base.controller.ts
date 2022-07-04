import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';
import {
  BaseCreateOneRequest,
  BaseDeleteOneRequest,
  BaseFindAllRequest,
  BaseFindOneByEmailRequest,
  BaseFindOneRequest,
  BaseUpdateOneRequest,
  IAccountBaseGrpcService,
} from '@ustagil/api/core/account/typing';
import { from } from 'rxjs';
import {
  BaseCreateOneCommand,
  BaseDeleteOneCommand,
  BaseUpdateOneCommand,
} from './command';
import {
  BaseReadAllQuery,
  BaseReadOneByEmailQuery,
  BaseReadOneQuery,
} from './query';

@Controller()
export class BaseController implements IAccountBaseGrpcService {
  constructor(
    private readonly commandBus: CommandBus<
      BaseCreateOneCommand | BaseDeleteOneCommand | BaseUpdateOneCommand
    >,
    private readonly queryBus: QueryBus<
      BaseReadAllQuery | BaseReadOneQuery | BaseReadOneByEmailQuery
    >
  ) {}

  @GrpcMethod('BaseService')
  ListBases(data: BaseFindAllRequest) {
    return from(this.queryBus.execute(new BaseReadAllQuery(data)));
  }

  @GrpcMethod('BaseService')
  GetBaseByEmail(data: BaseFindOneByEmailRequest) {
    return from(this.queryBus.execute(new BaseReadOneByEmailQuery(data)));
  }

  @GrpcMethod('BaseService')
  GetBase(data: BaseFindOneRequest) {
    return from(this.queryBus.execute(new BaseReadOneQuery(data)));
  }

  @GrpcMethod('BaseService')
  CreateBase(data: BaseCreateOneRequest) {
    return from(this.commandBus.execute(new BaseCreateOneCommand(data)));
  }

  @GrpcMethod('BaseService')
  UpdateBase(data: BaseUpdateOneRequest) {
    return from(
      this.commandBus.execute(
        new BaseUpdateOneCommand({
          id: data.id,
          ...data,
        })
      )
    );
  }

  @GrpcMethod('BaseService')
  DeleteBase(data: BaseDeleteOneRequest) {
    return from(this.commandBus.execute(new BaseDeleteOneCommand(data)));
  }
}
