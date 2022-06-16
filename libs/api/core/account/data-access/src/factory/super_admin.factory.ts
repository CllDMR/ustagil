import { Injectable } from '@nestjs/common';
import { SuperAdminDomain } from '@ustagil/api/core/account/typing';
import { EntityDomainFactory } from '@ustagil/api/core/common/data-access';
import { ObjectId } from 'mongodb';
import { SuperAdmin } from '../schema/super_admin.schema';

@Injectable()
export class SuperAdminEntityDomainFactory
  implements EntityDomainFactory<SuperAdmin, SuperAdminDomain>
{
  createEntityFromDomain(domain: SuperAdminDomain): SuperAdmin {
    return {
      _id: new ObjectId(domain.id),
      role: domain.role,
      displayName: domain.displayName,
      email: domain.email,
      organization: domain.organization,
      password: domain.password,
    };
  }

  createDomainFromEntity(entity: SuperAdmin): SuperAdminDomain {
    return new SuperAdminDomain({
      id: entity._id.toHexString(),
      role: entity.role,
      displayName: entity.displayName,
      email: entity.email,
      organization: entity.organization,
    });
  }
}
