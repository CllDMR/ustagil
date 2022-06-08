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

    const AccountMergedDomain =
      this.eventPublisher.mergeClassContext(AccountDomain);

    const foundAccountDomain = await this.accountRepository.findOne({ email });

    const accountMergedDomain = new AccountMergedDomain({
      displayName: foundAccountDomain.displayName,
      email: foundAccountDomain.email,
      id: foundAccountDomain.id,
      organization: foundAccountDomain.organization,
      password: foundAccountDomain.password,
    });

    accountMergedDomain.apply(
      new AccountReadedOneByEmailEvent(accountMergedDomain.id)
    );
    accountMergedDomain.commit();

    return accountMergedDomain;
  }
}
