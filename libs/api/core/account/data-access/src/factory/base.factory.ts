import { Injectable } from '@nestjs/common';
import { AccountBaseDomain } from '@ustagil/api/core/account/typing';
import { EntityDomainFactory } from '@ustagil/api/core/common/data-access';
import { AccountKind } from '@ustagil/api/core/common/typing';
import { ObjectId } from 'mongodb';
import { AccountBase } from '../schema/base.schema';

@Injectable()
export class AccountBaseEntityDomainFactory
  implements EntityDomainFactory<AccountBase, AccountBaseDomain>
{
  createEntityFromDomain(domain: AccountBaseDomain): AccountBase {
    return {
      _id: new ObjectId(domain.id),
      kind: domain.kind.toString(),
      role: domain.role,
      displayName: domain.displayName,
      email: domain.email,
      password: domain.password,
    };
  }

  createDomainFromEntity(entity: AccountBase): AccountBaseDomain {
    return new AccountBaseDomain({
      id: entity._id.toHexString(),
      kind: AccountKind[entity.kind],
      role: entity.role,
      displayName: entity.displayName,
      email: entity.email,
      password: entity.password,
    });
  }
}
