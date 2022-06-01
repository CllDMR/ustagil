import { Injectable } from '@nestjs/common';
import { UserDomain } from '@ustagil/api/core/account/typing';
import { EntityDomainFactory } from '@ustagil/api/core/common/data-access';
import { ObjectId } from 'mongodb';
import { User } from '../schema/user.schema';

@Injectable()
export class UserEntityDomainFactory
  implements EntityDomainFactory<User, UserDomain>
{
  createEntityFromDomain(domain: UserDomain): User {
    return {
      _id: new ObjectId(domain.id),
      displayName: domain.displayName,
      email: domain.email,
      organization: domain.organization,
      password: domain.password,
    };
  }

  createDomainFromEntity(entity: User): UserDomain {
    return new UserDomain({
      id: entity._id.toHexString(),
      displayName: entity.displayName,
      email: entity.email,
      organization: entity.organization,
      password: entity.password,
    });
  }
}
