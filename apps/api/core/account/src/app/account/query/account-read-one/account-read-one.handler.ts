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
    const account = this.eventPublisher.mergeObjectContext(
      new AccountDomain({})
    );

    account.apply(new AccountReadedOneEvent(id));
    account.commit();

    return await this.accountRepository.findOneById(id);
  }
}
