import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import {
  SuperAdmin,
  SuperAdminEntityDomainFactory,
  SuperAdminMongooseRepository,
  SuperAdminSchema,
} from '@ustagil/api/core/account/data-access';
import { SuperAdminCommandHandlers } from './command';
import { SuperAdminEventHandlers } from './event';
import { SuperAdminQueryHandlers } from './query';
import { SuperAdminController } from './super_admin.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: SuperAdmin.name,
        schema: SuperAdminSchema,
      },
    ]),
    CqrsModule,
  ],
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
