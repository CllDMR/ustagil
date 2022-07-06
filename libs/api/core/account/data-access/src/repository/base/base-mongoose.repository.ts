import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AccountBaseDomain } from '@ustagil/api/core/account/typing';
import { MongooseRepository } from '@ustagil/api/core/common/data-access';
import { AccountBaseEntityDomainFactory } from '../../factory/base.factory';
import { AccountBase } from '../../schema/base.schema';

@Injectable()
export class AccountBaseMongooseRepository extends MongooseRepository<
  AccountBase,
  AccountBaseDomain
> {
  constructor(
    @InjectModel(AccountBase.name) accountBaseModel,
    accountBaseEntityDomainFactory: AccountBaseEntityDomainFactory
  ) {
    super(accountBaseModel, accountBaseEntityDomainFactory);
  }
}
