import { EventPublisher, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AccountOrganizationMongooseRepository } from '@ustagil/api/core/account/data-access';
import { AccountOrganizationDomain } from '@ustagil/api/core/account/typing';
import { ObjectId } from 'mongodb';
import { AccountOrganizationReadedAllEvent } from '../../event';
import { AccountOrganizationReadAllQuery } from './read-all.query';

@QueryHandler(AccountOrganizationReadAllQuery)
export class AccountOrganizationReadAllHandler
  implements IQueryHandler<AccountOrganizationReadAllQuery>
{
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly accountOrganizationRepository: AccountOrganizationMongooseRepository
  ) {}

  async execute({ dto }: AccountOrganizationReadAllQuery): Promise<{
    organizations: AccountOrganizationDomain[];
    next_page_cursor: string;
  }> {
    const { page_size = 10, next_page_cursor } = dto;

    const accountOrganizationDomain = this.eventPublisher.mergeObjectContext(
      new AccountOrganizationDomain({})
    );

    const readedAccountOrganizationDomains =
      await this.accountOrganizationRepository.readAll(
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

    accountOrganizationDomain.apply(new AccountOrganizationReadedAllEvent());
    accountOrganizationDomain.commit();

    let new_next_page_cursor = '';

    if (readedAccountOrganizationDomains.length >= page_size + 1) {
      const nextAccountOrganization = readedAccountOrganizationDomains.pop();
      new_next_page_cursor = nextAccountOrganization.id;
    }
    return {
      organizations: readedAccountOrganizationDomains,
      next_page_cursor: new_next_page_cursor,
    };
  }
}
