import { EventPublisher, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AccountBaseMongooseRepository } from '@ustagil/api/core/account/data-access';
import { AccountBaseDomain } from '@ustagil/api/core/account/typing';
import { ObjectId } from 'mongodb';
import { AccountBaseReadedAllEvent } from '../../event';
import { AccountBaseReadAllQuery } from './read-all.query';

@QueryHandler(AccountBaseReadAllQuery)
export class AccountBaseReadAllHandler
  implements IQueryHandler<AccountBaseReadAllQuery>
{
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly accountBaseRepository: AccountBaseMongooseRepository
  ) {}

  async execute({ dto }: AccountBaseReadAllQuery): Promise<{
    bases: AccountBaseDomain[];
    next_page_cursor: string;
  }> {
    const { page_size = 10, next_page_cursor } = dto;

    const accountBaseDomain = this.eventPublisher.mergeObjectContext(
      new AccountBaseDomain({})
    );

    const readedAccountBaseDomains = await this.accountBaseRepository.readAll(
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

    accountBaseDomain.apply(new AccountBaseReadedAllEvent());
    accountBaseDomain.commit();

    let new_next_page_cursor = '';

    if (readedAccountBaseDomains.length >= page_size + 1) {
      const nextAccountBase = readedAccountBaseDomains.pop();
      new_next_page_cursor = nextAccountBase.id;
    }
    return {
      bases: readedAccountBaseDomains,
      next_page_cursor: new_next_page_cursor,
    };
  }
}
