import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AccountOrganizationDomain } from '@ustagil/api/core/account/typing';
import { MongooseRepository } from '@ustagil/api/core/common/data-access';
import { AccountOrganizationEntityDomainFactory } from '../../factory/organization.factory';
import { AccountOrganization } from '../../schema/organization.schema';

@Injectable()
export class AccountOrganizationMongooseRepository extends MongooseRepository<
  AccountOrganization,
  AccountOrganizationDomain
> {
  constructor(
    @InjectModel(AccountOrganization.name) accountOrganizationModel,
    accountOrganizationEntityDomainFactory: AccountOrganizationEntityDomainFactory
  ) {
    super(accountOrganizationModel, accountOrganizationEntityDomainFactory);
  }
}
