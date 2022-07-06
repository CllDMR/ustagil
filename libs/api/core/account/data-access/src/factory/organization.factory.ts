import { Injectable } from '@nestjs/common';
import { AccountOrganizationDomain } from '@ustagil/api/core/account/typing';
import { EntityDomainFactory } from '@ustagil/api/core/common/data-access';
import { AccountKind } from '@ustagil/api/core/common/typing';
import { ObjectId } from 'mongodb';
import { AccountOrganization } from '../schema/organization.schema';

@Injectable()
export class AccountOrganizationEntityDomainFactory
  implements
    EntityDomainFactory<AccountOrganization, AccountOrganizationDomain>
{
  createEntityFromDomain(
    domain: AccountOrganizationDomain
  ): AccountOrganization {
    return {
      _id: new ObjectId(domain.id),
      kind: domain.kind.toString(),
      role: domain.role,
      displayName: domain.displayName,
      email: domain.email,
      organization: domain.organization,
      password: domain.password,
    };
  }

  createDomainFromEntity(
    entity: AccountOrganization
  ): AccountOrganizationDomain {
    return new AccountOrganizationDomain({
      id: entity._id.toHexString(),
      kind: AccountKind[entity.kind],
      role: entity.role,
      displayName: entity.displayName,
      email: entity.email,
      organization: entity.organization,
      password: entity.password,
    });
  }
}
