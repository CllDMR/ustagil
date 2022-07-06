import { EventPublisher, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AccountUserMongooseRepository } from '@ustagil/api/core/account/data-access';
import { AccountUserDomain } from '@ustagil/api/core/account/typing';
import { AccountUserReadedOneByEmailEvent } from '../../event';
import { AccountUserReadOneByEmailQuery } from './read-one-by-email.query';

@QueryHandler(AccountUserReadOneByEmailQuery)
export class AccountUserReadOneByEmailHandler
  implements IQueryHandler<AccountUserReadOneByEmailQuery>
{
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly accountUserRepository: AccountUserMongooseRepository
  ) {}

  async execute({ dto }: AccountUserReadOneByEmailQuery) {
    const { email } = dto;

    const AccountUserMergedDomain =
      this.eventPublisher.mergeClassContext(AccountUserDomain);

    const readedAccountUserDomain = await this.accountUserRepository.readOne(
      { email },
      '+password'
    );

    const accountUserDomain = new AccountUserMergedDomain(
      readedAccountUserDomain
    );

    accountUserDomain.apply(
      new AccountUserReadedOneByEmailEvent(accountUserDomain.id)
    );
    accountUserDomain.commit();

    return accountUserDomain;
  }
}
