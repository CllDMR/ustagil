import { Injectable } from '@nestjs/common';
import { UserDomain } from '@ustagil/api/core/account/typing';
import { EntityDomainFactory } from '@ustagil/api/core/common/data-access';
import { AccountKind } from '@ustagil/api/core/common/typing';
import { ObjectId } from 'mongodb';
import { User } from '../schema/user.schema';

@Injectable()
export class UserEntityDomainFactory
  implements EntityDomainFactory<User, UserDomain>
{
  createEntityFromDomain(domain: UserDomain): User {
    return {
      _id: new ObjectId(domain.id),
      kind: domain.kind.toString(),
      role: domain.role,
      displayName: domain.displayName,
      email: domain.email,
      password: domain.password,
    };
  }

  createDomainFromEntity(entity: User): UserDomain {
    return new UserDomain({
      id: entity._id.toHexString(),
      kind: AccountKind[entity.kind],
      role: entity.role,
      displayName: entity.displayName,
      email: entity.email,
      password: entity.password,
    });
  }
}
