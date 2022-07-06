import { EventPublisher, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AccountUserMongooseRepository } from '@ustagil/api/core/account/data-access';
import { AccountUserDomain } from '@ustagil/api/core/account/typing';
import { ObjectId } from 'mongodb';
import { AccountUserReadedAllEvent } from '../../event';
import { AccountUserReadAllQuery } from './read-all.query';

@QueryHandler(AccountUserReadAllQuery)
export class AccountUserReadAllHandler
  implements IQueryHandler<AccountUserReadAllQuery>
{
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly accountUserRepository: AccountUserMongooseRepository
  ) {}

  async execute({ dto }: AccountUserReadAllQuery): Promise<{
    users: AccountUserDomain[];
    next_page_cursor: string;
  }> {
    const { page_size = 10, next_page_cursor } = dto;

    const accountUserDomain = this.eventPublisher.mergeObjectContext(
      new AccountUserDomain({})
    );

    const readedAccountUserDomains = await this.accountUserRepository.readAll(
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

    accountUserDomain.apply(new AccountUserReadedAllEvent());
    accountUserDomain.commit();

    let new_next_page_cursor = '';

    if (readedAccountUserDomains.length >= page_size + 1) {
      const nextAccountUser = readedAccountUserDomains.pop();
      new_next_page_cursor = nextAccountUser.id;
    }
    return {
      users: readedAccountUserDomains,
      next_page_cursor: new_next_page_cursor,
    };
  }
}
