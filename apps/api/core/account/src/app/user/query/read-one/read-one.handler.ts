import { EventPublisher, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AccountUserMongooseRepository } from '@ustagil/api/core/account/data-access';
import { AccountUserDomain } from '@ustagil/api/core/account/typing';
import { AccountUserReadedOneEvent } from '../../event';
import { AccountUserReadOneQuery } from './read-one.query';

@QueryHandler(AccountUserReadOneQuery)
export class AccountUserReadOneHandler
  implements IQueryHandler<AccountUserReadOneQuery>
{
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly accountUserRepository: AccountUserMongooseRepository
  ) {}

  async execute({ dto }: AccountUserReadOneQuery): Promise<AccountUserDomain> {
    const { id } = dto;

    const AccountUserMergedDomain =
      this.eventPublisher.mergeClassContext(AccountUserDomain);

    const readedAccountUserDomain =
      await this.accountUserRepository.readOneById(id);

    const accountUserDomain = new AccountUserMergedDomain(
      readedAccountUserDomain
    );

    accountUserDomain.apply(
      new AccountUserReadedOneEvent(accountUserDomain.id)
    );
    accountUserDomain.commit();

    return accountUserDomain;
  }
}
