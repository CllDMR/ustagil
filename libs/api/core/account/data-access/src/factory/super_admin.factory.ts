import { Injectable } from '@nestjs/common';
import { SuperAdminDomain } from '@ustagil/api/core/account/typing';
import { EntityDomainFactory } from '@ustagil/api/core/common/data-access';
import { AccountKind } from '@ustagil/api/core/common/typing';
import { ObjectId } from 'mongodb';
import { SuperAdmin } from '../schema/super_admin.schema';

@Injectable()
export class SuperAdminEntityDomainFactory
  implements EntityDomainFactory<SuperAdmin, SuperAdminDomain>
{
  createEntityFromDomain(domain: SuperAdminDomain): SuperAdmin {
    return {
      _id: new ObjectId(domain.id),
      kind: domain.kind.toString(),
      role: domain.role,
      displayName: domain.displayName,
      email: domain.email,
      password: domain.password,
    };
  }

  createDomainFromEntity(entity: SuperAdmin): SuperAdminDomain {
    return new SuperAdminDomain({
      id: entity._id.toHexString(),
      kind: AccountKind[entity.kind],
      role: entity.role,
      displayName: entity.displayName,
      email: entity.email,
    });
  }
}
