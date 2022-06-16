import { EventPublisher, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { OrganizationMongooseRepository } from '@ustagil/api/core/account/data-access';
import { OrganizationDomain } from '@ustagil/api/core/account/typing';
import { ObjectId } from 'mongodb';
import { OrganizationReadedAllEvent } from '../../event';
import { OrganizationReadAllQuery } from './organization-read-all.query';

@QueryHandler(OrganizationReadAllQuery)
export class OrganizationReadAllHandler
  implements IQueryHandler<OrganizationReadAllQuery>
{
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly organizationRepository: OrganizationMongooseRepository
  ) {}

  async execute({ dto }: OrganizationReadAllQuery): Promise<{
    organizations: OrganizationDomain[];
    next_page_cursor: string;
  }> {
    const { page_size = 10, next_page_cursor } = dto;

    const organizationMergedDomain = this.eventPublisher.mergeObjectContext(
      new OrganizationDomain({})
    );

    const organizationDomains = await this.organizationRepository.findAll(
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

    organizationMergedDomain.apply(new OrganizationReadedAllEvent());
    organizationMergedDomain.commit();

    let new_next_page_cursor: string;

    if (organizationDomains.length >= page_size + 1) {
      const nextOrganization = organizationDomains.pop();
      new_next_page_cursor = nextOrganization.id;
    }
    return {
      organizations: organizationDomains,
      next_page_cursor: new_next_page_cursor,
    };
  }
}
