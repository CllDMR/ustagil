import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import {
  AccountMongooseModule,
  AccountUserEntityDomainFactory,
  AccountUserMongooseRepository,
} from '@ustagil/api/core/account/data-access';
import { AccountUserCommandHandlers } from './command';
import { AccountUserEventHandlers } from './event';
import { AccountUserQueryHandlers } from './query';
import { AccountUserController } from './user.controller';

@Module({
  imports: [AccountMongooseModule, CqrsModule],
  controllers: [AccountUserController],
  providers: [
    AccountUserMongooseRepository,
    AccountUserEntityDomainFactory,
    ...AccountUserCommandHandlers,
    ...AccountUserEventHandlers,
    ...AccountUserQueryHandlers,
  ],
})
export class AccountUserModule {}
