import { EventPublisher, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AccountMongooseRepository } from '@ustagil/api/core/account/data-access';
import { AccountDomain } from '@ustagil/api/core/account/typing';
import { ObjectId } from 'mongodb';
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

  async execute({ dto }: AccountReadAllQuery): Promise<{
    accounts: AccountDomain[];
    next_page_cursor: string;
  }> {
    const { page_size = 10, next_page_cursor } = dto;

    const accountMergedDomain = this.eventPublisher.mergeObjectContext(
      new AccountDomain({})
    );

    const accountDomains = await this.accountRepository.findAll(
      {
        ...(next_page_cursor
          ? {
              _id: {
                $lte: new ObjectId(next_page_cursor),
              },
            }
          : {}),
      },
      {
        limit: page_size + 1,
        sort: '-_id',
      }
    );

    accountMergedDomain.apply(new AccountReadedAllEvent());
    accountMergedDomain.commit();

    let new_next_page_cursor: string;

    if (accountDomains.length >= page_size + 1) {
      const nextAccount = accountDomains.pop();
      new_next_page_cursor = nextAccount.id;
    }
    return { accounts: accountDomains, next_page_cursor: new_next_page_cursor };
  }
}
