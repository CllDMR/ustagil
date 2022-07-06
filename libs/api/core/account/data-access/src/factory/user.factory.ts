import { Injectable } from '@nestjs/common';
import { AccountUserDomain } from '@ustagil/api/core/account/typing';
import { EntityDomainFactory } from '@ustagil/api/core/common/data-access';
import { AccountKind } from '@ustagil/api/core/common/typing';
import { ObjectId } from 'mongodb';
import { AccountUser } from '../schema/user.schema';

@Injectable()
export class AccountUserEntityDomainFactory
  implements EntityDomainFactory<AccountUser, AccountUserDomain>
{
  createEntityFromDomain(domain: AccountUserDomain): AccountUser {
    return {
      _id: new ObjectId(domain.id),
      kind: domain.kind.toString(),
      role: domain.role,
      displayName: domain.displayName,
      email: domain.email,
      password: domain.password,
    };
  }

  createDomainFromEntity(entity: AccountUser): AccountUserDomain {
    return new AccountUserDomain({
      id: entity._id.toHexString(),
      kind: AccountKind[entity.kind],
      role: entity.role,
      displayName: entity.displayName,
      email: entity.email,
      password: entity.password,
    });
  }
}
