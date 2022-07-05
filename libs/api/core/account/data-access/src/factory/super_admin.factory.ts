import { Injectable } from '@nestjs/common';
import { AccountSuperAdminDomain } from '@ustagil/api/core/account/typing';
import { EntityDomainFactory } from '@ustagil/api/core/common/data-access';
import { AccountKind } from '@ustagil/api/core/common/typing';
import { ObjectId } from 'mongodb';
import { AccountSuperAdmin } from '../schema/super_admin.schema';

@Injectable()
export class AccountSuperAdminEntityDomainFactory
  implements EntityDomainFactory<AccountSuperAdmin, AccountSuperAdminDomain>
{
  createEntityFromDomain(domain: AccountSuperAdminDomain): AccountSuperAdmin {
    return {
      _id: new ObjectId(domain.id),
      kind: domain.kind.toString(),
      role: domain.role,
      displayName: domain.displayName,
      email: domain.email,
      password: domain.password,
    };
  }

  createDomainFromEntity(entity: AccountSuperAdmin): AccountSuperAdminDomain {
    return new AccountSuperAdminDomain({
      id: entity._id.toHexString(),
      kind: AccountKind[entity.kind],
      role: entity.role,
      displayName: entity.displayName,
      email: entity.email,
    });
  }
}
