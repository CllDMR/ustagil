import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDomain } from '@ustagil/api/core/account/typing';
import { MongooseRepository } from '@ustagil/api/core/common/data-access';
import { UserEntityDomainFactory } from '../../factory/user.factory';
import { User } from '../../schema/user.schema';

@Injectable()
export class UserMongooseRepository extends MongooseRepository<
  User,
  UserDomain
> {
  constructor(
    @InjectModel(User.name) accountModel,
    accountEntityDomainFactory: UserEntityDomainFactory
  ) {
    super(accountModel, accountEntityDomainFactory);
  }
}
