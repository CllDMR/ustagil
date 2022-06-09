import { EventPublisher, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AccountMongooseRepository } from '@ustagil/api/core/account/data-access';
import { AccountDomain } from '@ustagil/api/core/account/typing';
import { AccountReadedOneEvent } from '../../event';
import { AccountReadOneQuery } from './account-read-one.query';

@QueryHandler(AccountReadOneQuery)
export class AccountReadOneHandler
  implements IQueryHandler<AccountReadOneQuery>
{
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly accountRepository: AccountMongooseRepository
  ) {}

  async execute({ dto }: AccountReadOneQuery): Promise<AccountDomain> {
    const { id } = dto;

    const AccountMergedDomain =
      this.eventPublisher.mergeClassContext(AccountDomain);

    const foundAccountDomain = await this.accountRepository.findOneById(id);

    const accountMergedDomain = new AccountMergedDomain({
      displayName: foundAccountDomain.displayName,
      email: foundAccountDomain.email,
      id: foundAccountDomain.id,
      organization: foundAccountDomain.organization,
      password: foundAccountDomain.password,
    });

    accountMergedDomain.apply(
      new AccountReadedOneEvent(accountMergedDomain.id)
    );
    accountMergedDomain.commit();

    return accountMergedDomain;
  }
}
