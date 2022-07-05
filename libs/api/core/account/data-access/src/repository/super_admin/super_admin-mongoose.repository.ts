import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AccountSuperAdminDomain } from '@ustagil/api/core/account/typing';
import { MongooseRepository } from '@ustagil/api/core/common/data-access';
import { AccountSuperAdminEntityDomainFactory } from '../../factory/super_admin.factory';
import { AccountSuperAdmin } from '../../schema/super_admin.schema';

@Injectable()
export class AccountSuperAdminMongooseRepository extends MongooseRepository<
  AccountSuperAdmin,
  AccountSuperAdminDomain
> {
  constructor(
    @InjectModel(AccountSuperAdmin.name) accountSuperAdminModel,
    accountSuperAdminEntityDomainFactory: AccountSuperAdminEntityDomainFactory
  ) {
    super(accountSuperAdminModel, accountSuperAdminEntityDomainFactory);
  }
}
