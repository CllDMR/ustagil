import { Injectable } from '@nestjs/common';
import { AccountDomain } from '@ustagil/api/core/account/typing';
import { EntityDomainFactory } from '@ustagil/api/core/common/data-access';
import { ObjectId } from 'mongodb';
import { Account } from '../schema/account.schema';

@Injectable()
export class AccountEntityDomainFactory
  implements EntityDomainFactory<Account, AccountDomain>
{
  createEntityFromDomain(domain: AccountDomain): Account {
    return {
      _id: new ObjectId(domain.id),
      displayName: domain.displayName,
      email: domain.email,
      organization: domain.organization,
      password: domain.password,
    };
  }

  createDomainFromEntity(entity: Account): AccountDomain {
    return new AccountDomain({
      id: entity._id.toHexString(),
      displayName: entity.displayName,
      email: entity.email,
      organization: entity.organization,
      password: entity.password,
    });
  }
}
