import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import {
  AccountBaseEntityDomainFactory,
  AccountBaseMongooseRepository,
  AccountMongooseModule,
} from '@ustagil/api/core/account/data-access';
import { AccountBaseController } from './base.controller';
import { AccountBaseCommandHandlers } from './command';
import { AccountBaseEventHandlers } from './event';
import { AccountBaseQueryHandlers } from './query';

@Module({
  imports: [AccountMongooseModule, CqrsModule],
  controllers: [AccountBaseController],
  providers: [
    AccountBaseMongooseRepository,
    AccountBaseEntityDomainFactory,
    ...AccountBaseCommandHandlers,
    ...AccountBaseEventHandlers,
    ...AccountBaseQueryHandlers,
  ],
})
export class AccountBaseModule {}
