import { Injectable } from '@nestjs/common';
import { OrganizationDomain } from '@ustagil/api/core/account/typing';
import { EntityDomainFactory } from '@ustagil/api/core/common/data-access';
import { ObjectId } from 'mongodb';
import { Organization } from '../schema/organization.schema';

@Injectable()
export class OrganizationEntityDomainFactory
  implements EntityDomainFactory<Organization, OrganizationDomain>
{
  createEntityFromDomain(domain: OrganizationDomain): Organization {
    return {
      _id: new ObjectId(domain.id),
      role: domain.role,
      displayName: domain.displayName,
      email: domain.email,
      organization: domain.organization,
      password: domain.password,
    };
  }

  createDomainFromEntity(entity: Organization): OrganizationDomain {
    return new OrganizationDomain({
      id: entity._id.toHexString(),
      role: entity.role,
      displayName: entity.displayName,
      email: entity.email,
      organization: entity.organization,
      password: entity.password,
    });
  }
}
