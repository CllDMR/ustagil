import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Account,
  AccountEntityDomainFactory,
  AccountMongooseRepository,
  AccountSchema,
} from '@ustagil/api/core/account/data-access';
import { AccountGrpcController } from './account-grpc.controller';
import { AccountCommandHandlers } from './command';
import { AccountEventHandlers } from './event';
import { AccountQueryHandlers } from './query';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Account.name,
        schema: AccountSchema,
      },
    ]),
    CqrsModule,
  ],
  controllers: [
    // AccountController,
    AccountGrpcController,
  ],
  providers: [
    AccountMongooseRepository,
    AccountEntityDomainFactory,
    ...AccountCommandHandlers,
    ...AccountEventHandlers,
    ...AccountQueryHandlers,
  ],
})
export class AccountModule {}
