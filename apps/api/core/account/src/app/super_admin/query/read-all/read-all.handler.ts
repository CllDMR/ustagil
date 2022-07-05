import { EventPublisher, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AccountSuperAdminMongooseRepository } from '@ustagil/api/core/account/data-access';
import { AccountSuperAdminDomain } from '@ustagil/api/core/account/typing';
import { ObjectId } from 'mongodb';
import { AccountSuperAdminReadedAllEvent } from '../../event';
import { AccountSuperAdminReadAllQuery } from './read-all.query';

@QueryHandler(AccountSuperAdminReadAllQuery)
export class AccountSuperAdminReadAllHandler
  implements IQueryHandler<AccountSuperAdminReadAllQuery>
{
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly accountSuperAdminRepository: AccountSuperAdminMongooseRepository
  ) {}

  async execute({ dto }: AccountSuperAdminReadAllQuery): Promise<{
    super_admins: AccountSuperAdminDomain[];
    next_page_cursor: string;
  }> {
    const { page_size = 10, next_page_cursor } = dto;

    const accountSuperAdminDomain = this.eventPublisher.mergeObjectContext(
      new AccountSuperAdminDomain({})
    );

    const readedAccountSuperAdminDomains =
      await this.accountSuperAdminRepository.readAll(
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

    accountSuperAdminDomain.apply(new AccountSuperAdminReadedAllEvent());
    accountSuperAdminDomain.commit();

    let new_next_page_cursor = '';

    if (readedAccountSuperAdminDomains.length >= page_size + 1) {
      const nextAccountSuperAdmin = readedAccountSuperAdminDomains.pop();
      new_next_page_cursor = nextAccountSuperAdmin.id;
    }
    return {
      super_admins: readedAccountSuperAdminDomains,
      next_page_cursor: new_next_page_cursor,
    };
  }
}
