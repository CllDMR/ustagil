import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import {
  BaseMongooseModule,
  UserEntityDomainFactory,
  UserMongooseRepository,
} from '@ustagil/api/core/account/data-access';
import { UserCommandHandlers } from './command';
import { UserEventHandlers } from './event';
import { UserQueryHandlers } from './query';
import { UserController } from './user.controller';

@Module({
  imports: [BaseMongooseModule, CqrsModule],
  controllers: [UserController],
  providers: [
    UserMongooseRepository,
    UserEntityDomainFactory,
    ...UserCommandHandlers,
    ...UserEventHandlers,
    ...UserQueryHandlers,
  ],
})
export class UserModule {}
