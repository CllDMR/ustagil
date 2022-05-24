import { EventPublisher, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AccountMongooseRepository } from '@ustagil/api/core/account/data-access';
import { AccountDomain } from '@ustagil/api/core/account/typing';
import { AccountReadedAllEvent } from '../../event';
import { AccountReadAllQuery } from './account-read-all.query';

@QueryHandler(AccountReadAllQuery)
export class AccountReadAllHandler
  implements IQueryHandler<AccountReadAllQuery>
{
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly accountRepository: AccountMongooseRepository
  ) {}

  async execute({ dto }: AccountReadAllQuery): Promise<AccountDomain[]> {
    const account = this.eventPublisher.mergeObjectContext(
      new AccountDomain({})
    );

    account.apply(new AccountReadedAllEvent());
    account.commit();

    return await this.accountRepository.findAll();
  }
}
