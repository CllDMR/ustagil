import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { OrganizationDomain } from '@ustagil/api/core/account/typing';
import { MongooseRepository } from '@ustagil/api/core/common/data-access';
import { OrganizationEntityDomainFactory } from '../../factory/organization.factory';
import { Organization } from '../../schema/organization.schema';

@Injectable()
export class OrganizationMongooseRepository extends MongooseRepository<
  Organization,
  OrganizationDomain
> {
  constructor(
    @InjectModel(Organization.name) accountModel,
    accountEntityDomainFactory: OrganizationEntityDomainFactory
  ) {
    super(accountModel, accountEntityDomainFactory);
  }
}
