import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import {
  User,
  UserEntityDomainFactory,
  UserMongooseRepository,
  UserSchema,
} from '@ustagil/api/core/account/data-access';
import { UserCommandHandlers } from './command';
import { UserEventHandlers } from './event';
import { UserQueryHandlers } from './query';
import { UserController } from './user.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    CqrsModule,
  ],
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
