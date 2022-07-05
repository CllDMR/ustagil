import { EventPublisher, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AccountBaseMongooseRepository } from '@ustagil/api/core/account/data-access';
import { AccountBaseDomain } from '@ustagil/api/core/account/typing';
import { AccountBaseReadedOneEvent } from '../../event';
import { AccountBaseReadOneQuery } from './read-one.query';

@QueryHandler(AccountBaseReadOneQuery)
export class AccountBaseReadOneHandler
  implements IQueryHandler<AccountBaseReadOneQuery>
{
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly accountBaseRepository: AccountBaseMongooseRepository
  ) {}

  async execute({ dto }: AccountBaseReadOneQuery): Promise<AccountBaseDomain> {
    const { id } = dto;

    const AccountBaseMergedDomain =
      this.eventPublisher.mergeClassContext(AccountBaseDomain);

    const readedAccountBaseDomain =
      await this.accountBaseRepository.readOneById(id);

    const accountBaseDomain = new AccountBaseMergedDomain(
      readedAccountBaseDomain
    );

    accountBaseDomain.apply(
      new AccountBaseReadedOneEvent(accountBaseDomain.id)
    );
    accountBaseDomain.commit();

    return accountBaseDomain;
  }
}
