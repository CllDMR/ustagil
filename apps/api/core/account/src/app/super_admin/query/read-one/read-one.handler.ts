import { EventPublisher, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AccountSuperAdminMongooseRepository } from '@ustagil/api/core/account/data-access';
import { AccountSuperAdminDomain } from '@ustagil/api/core/account/typing';
import { AccountSuperAdminReadedOneEvent } from '../../event';
import { AccountSuperAdminReadOneQuery } from './read-one.query';

@QueryHandler(AccountSuperAdminReadOneQuery)
export class AccountSuperAdminReadOneHandler
  implements IQueryHandler<AccountSuperAdminReadOneQuery>
{
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly accountSuperAdminRepository: AccountSuperAdminMongooseRepository
  ) {}

  async execute({
    dto,
  }: AccountSuperAdminReadOneQuery): Promise<AccountSuperAdminDomain> {
    const { id } = dto;

    const AccountSuperAdminMergedDomain = this.eventPublisher.mergeClassContext(
      AccountSuperAdminDomain
    );

    const readedAccountSuperAdminDomain =
      await this.accountSuperAdminRepository.readOneById(id);

    const accountSuperAdminDomain = new AccountSuperAdminMergedDomain(
      readedAccountSuperAdminDomain
    );

    accountSuperAdminDomain.apply(
      new AccountSuperAdminReadedOneEvent(accountSuperAdminDomain.id)
    );
    accountSuperAdminDomain.commit();

    return accountSuperAdminDomain;
  }
}
