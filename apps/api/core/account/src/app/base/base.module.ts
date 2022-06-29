import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Base,
  BaseEntityDomainFactory,
  BaseMongooseRepository,
  BaseSchema,
} from '@ustagil/api/core/account/data-access';
import { BaseController } from './base.controller';
import { BaseCommandHandlers } from './command';
import { BaseEventHandlers } from './event';
import { BaseQueryHandlers } from './query';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Base.name,
        schema: BaseSchema,
      },
    ]),
    CqrsModule,
  ],
  controllers: [BaseController],
  providers: [
    BaseMongooseRepository,
    BaseEntityDomainFactory,
    ...BaseCommandHandlers,
    ...BaseEventHandlers,
    ...BaseQueryHandlers,
  ],
})
export class BaseModule {}
