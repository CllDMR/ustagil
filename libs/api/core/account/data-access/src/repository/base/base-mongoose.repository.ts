import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseDomain } from '@ustagil/api/core/account/typing';
import { MongooseRepository } from '@ustagil/api/core/common/data-access';
import { BaseEntityDomainFactory } from '../../factory/base.factory';
import { Base } from '../../schema/base.schema';

@Injectable()
export class BaseMongooseRepository extends MongooseRepository<
  Base,
  BaseDomain
> {
  constructor(
    @InjectModel(Base.name) baseModel,
    baseEntityDomainFactory: BaseEntityDomainFactory
  ) {
    super(baseModel, baseEntityDomainFactory);
  }
}
