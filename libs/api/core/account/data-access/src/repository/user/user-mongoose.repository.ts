import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AccountUserDomain } from '@ustagil/api/core/account/typing';
import { MongooseRepository } from '@ustagil/api/core/common/data-access';
import { AccountUserEntityDomainFactory } from '../../factory/user.factory';
import { AccountUser } from '../../schema/user.schema';

@Injectable()
export class AccountUserMongooseRepository extends MongooseRepository<
  AccountUser,
  AccountUserDomain
> {
  constructor(
    @InjectModel(AccountUser.name) accountUserModel,
    accountUserEntityDomainFactory: AccountUserEntityDomainFactory
  ) {
    super(accountUserModel, accountUserEntityDomainFactory);
  }
}
