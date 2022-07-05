import { EventPublisher, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AccountSuperAdminMongooseRepository } from '@ustagil/api/core/account/data-access';
import { AccountSuperAdminDomain } from '@ustagil/api/core/account/typing';
import { AccountSuperAdminReadedOneByEmailEvent } from '../../event';
import { AccountSuperAdminReadOneByEmailQuery } from './read-one-by-email.query';

@QueryHandler(AccountSuperAdminReadOneByEmailQuery)
export class AccountSuperAdminReadOneByEmailHandler
  implements IQueryHandler<AccountSuperAdminReadOneByEmailQuery>
{
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly accountSuperAdminRepository: AccountSuperAdminMongooseRepository
  ) {}

  async execute({ dto }: AccountSuperAdminReadOneByEmailQuery) {
    const { email } = dto;

    const AccountSuperAdminMergedDomain = this.eventPublisher.mergeClassContext(
      AccountSuperAdminDomain
    );

    const readedAccountSuperAdminDomain =
      await this.accountSuperAdminRepository.readOne({
        email,
      });

    const accountSuperAdminDomain = new AccountSuperAdminMergedDomain(
      readedAccountSuperAdminDomain
    );

    accountSuperAdminDomain.apply(
      new AccountSuperAdminReadedOneByEmailEvent(accountSuperAdminDomain.id)
    );
    accountSuperAdminDomain.commit();

    return accountSuperAdminDomain;
  }
}
