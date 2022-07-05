import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import {
  AccountMongooseModule,
  AccountOrganizationEntityDomainFactory,
  AccountOrganizationMongooseRepository,
} from '@ustagil/api/core/account/data-access';
import { AccountOrganizationCommandHandlers } from './command';
import { AccountOrganizationEventHandlers } from './event';
import { AccountOrganizationController } from './organization.controller';
import { AccountOrganizationQueryHandlers } from './query';

@Module({
  imports: [AccountMongooseModule, CqrsModule],
  controllers: [AccountOrganizationController],
  providers: [
    AccountOrganizationMongooseRepository,
    AccountOrganizationEntityDomainFactory,
    ...AccountOrganizationCommandHandlers,
    ...AccountOrganizationEventHandlers,
    ...AccountOrganizationQueryHandlers,
  ],
})
export class AccountOrganizationModule {}
