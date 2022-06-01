import { EventPublisher, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AccountMongooseRepository } from '@ustagil/api/core/account/data-access';
import { AccountDomain } from '@ustagil/api/core/account/typing';
import { AccountReadedOneByEmailEvent } from '../../event';
import { AccountReadOneByEmailQuery } from './account-read-one-by-email.query';

@QueryHandler(AccountReadOneByEmailQuery)
export class AccountReadOneByEmailHandler
  implements IQueryHandler<AccountReadOneByEmailQuery>
{
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly accountRepository: AccountMongooseRepository
  ) {}

  async execute({ dto }: AccountReadOneByEmailQuery) {
    const { email } = dto;
    const accountData = await this.accountRepository.findOne({ email });

    const account = this.eventPublisher.mergeObjectContext(
      new AccountDomain({
        id: accountData.id,
        displayName: accountData.displayName,
        email: accountData.email,
        organization: accountData.organization,
        password: accountData.password,
      })
    );
    account.apply(new AccountReadedOneByEmailEvent(account.id));
    account.commit();

    return account;
  }
}
