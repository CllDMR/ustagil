import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import {
  BaseMongooseModule,
  SuperAdminEntityDomainFactory,
  SuperAdminMongooseRepository,
} from '@ustagil/api/core/account/data-access';
import { SuperAdminCommandHandlers } from './command';
import { SuperAdminEventHandlers } from './event';
import { SuperAdminQueryHandlers } from './query';
import { SuperAdminController } from './super_admin.controller';

@Module({
  imports: [BaseMongooseModule, CqrsModule],
  controllers: [SuperAdminController],
  providers: [
    SuperAdminMongooseRepository,
    SuperAdminEntityDomainFactory,
    ...SuperAdminCommandHandlers,
    ...SuperAdminEventHandlers,
    ...SuperAdminQueryHandlers,
  ],
})
export class SuperAdminModule {}
