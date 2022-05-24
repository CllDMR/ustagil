import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AccountDomain } from '@ustagil/api/core/account/typing';
import { MongooseRepository } from '@ustagil/api/core/common/data-access';
import { AccountEntityDomainFactory } from '../factory/account.factory';
import { Account } from '../schema/account.schema';

@Injectable()
export class AccountMongooseRepository extends MongooseRepository<
  Account,
  AccountDomain
> {
  constructor(
    @InjectModel(Account.name) accountModel,
    accountEntityDomainFactory: AccountEntityDomainFactory
  ) {
    super(accountModel, accountEntityDomainFactory);
  }
}
