import { Injectable } from '@nestjs/common';
import { BaseDomain } from '@ustagil/api/core/account/typing';
import { EntityDomainFactory } from '@ustagil/api/core/common/data-access';
import { AccountKind } from '@ustagil/api/core/common/typing';
import { ObjectId } from 'mongodb';
import { Base } from '../schema/base.schema';

@Injectable()
export class BaseEntityDomainFactory
  implements EntityDomainFactory<Base, BaseDomain>
{
  createEntityFromDomain(domain: BaseDomain): Base {
    return {
      _id: new ObjectId(domain.id),
      kind: domain.kind.toString(),
      role: domain.role,
      displayName: domain.displayName,
      email: domain.email,
      password: domain.password,
    };
  }

  createDomainFromEntity(entity: Base): BaseDomain {
    return new BaseDomain({
      id: entity._id.toHexString(),
      kind: AccountKind[entity.kind],
      role: entity.role,
      displayName: entity.displayName,
      email: entity.email,
      password: entity.password,
    });
  }
}
