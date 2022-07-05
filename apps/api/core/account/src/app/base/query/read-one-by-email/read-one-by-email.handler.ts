import { EventPublisher, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AccountBaseMongooseRepository } from '@ustagil/api/core/account/data-access';
import { AccountBaseDomain } from '@ustagil/api/core/account/typing';
import { AccountBaseReadedOneByEmailEvent } from '../../event';
import { AccountBaseReadOneByEmailQuery } from './read-one-by-email.query';

@QueryHandler(AccountBaseReadOneByEmailQuery)
export class AccountBaseReadOneByEmailHandler
  implements IQueryHandler<AccountBaseReadOneByEmailQuery>
{
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly accountBaseRepository: AccountBaseMongooseRepository
  ) {}

  async execute({ dto }: AccountBaseReadOneByEmailQuery) {
    const { email } = dto;

    const AccountBaseMergedDomain =
      this.eventPublisher.mergeClassContext(AccountBaseDomain);

    const readedAccountBaseDomain = await this.accountBaseRepository.readOne(
      { email },
      '+password'
    );

    const accountBaseDomain = new AccountBaseMergedDomain(
      readedAccountBaseDomain
    );

    accountBaseDomain.apply(
      new AccountBaseReadedOneByEmailEvent(accountBaseDomain.id)
    );
    accountBaseDomain.commit();

    return accountBaseDomain;
  }
}
