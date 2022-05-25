import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Organization,
  OrganizationEntityDomainFactory,
  OrganizationMongooseRepository,
  OrganizationSchema,
} from '@ustagil/api/core/account/data-access';
import { OrganizationCommandHandlers } from './command';
import { OrganizationEventHandlers } from './event';
import { OrganizationController } from './organization.controller';
import { OrganizationQueryHandlers } from './query';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Organization.name,
        schema: OrganizationSchema,
      },
    ]),
    CqrsModule,
  ],
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
