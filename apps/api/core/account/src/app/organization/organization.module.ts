import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import {
  BaseMongooseModule,
  OrganizationEntityDomainFactory,
  OrganizationMongooseRepository,
} from '@ustagil/api/core/account/data-access';
import { OrganizationCommandHandlers } from './command';
import { OrganizationEventHandlers } from './event';
import { OrganizationController } from './organization.controller';
import { OrganizationQueryHandlers } from './query';

@Module({
  imports: [BaseMongooseModule, CqrsModule],
  controllers: [OrganizationController],
  providers: [
    OrganizationMongooseRepository,
    OrganizationEntityDomainFactory,
    ...OrganizationCommandHandlers,
    ...OrganizationEventHandlers,
    ...OrganizationQueryHandlers,
  ],
})
export class OrganizationModule {}
