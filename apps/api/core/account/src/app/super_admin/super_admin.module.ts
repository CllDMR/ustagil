import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import {
  AccountMongooseModule,
  AccountSuperAdminEntityDomainFactory,
  AccountSuperAdminMongooseRepository,
} from '@ustagil/api/core/account/data-access';
import { AccountSuperAdminCommandHandlers } from './command';
import { AccountSuperAdminEventHandlers } from './event';
import { AccountSuperAdminQueryHandlers } from './query';
import { AccountSuperAdminController } from './super_admin.controller';

@Module({
  imports: [AccountMongooseModule, CqrsModule],
  controllers: [AccountSuperAdminController],
  providers: [
    AccountSuperAdminMongooseRepository,
    AccountSuperAdminEntityDomainFactory,
    ...AccountSuperAdminCommandHandlers,
    ...AccountSuperAdminEventHandlers,
    ...AccountSuperAdminQueryHandlers,
  ],
})
export class AccountSuperAdminModule {}
