import { EventPublisher, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SuperAdminMongooseRepository } from '@ustagil/api/core/account/data-access';
import { SuperAdminDomain } from '@ustagil/api/core/account/typing';
import { ObjectId } from 'mongodb';
import { SuperAdminReadedAllEvent } from '../../event';
import { SuperAdminReadAllQuery } from './read-all.query';

@QueryHandler(SuperAdminReadAllQuery)
export class SuperAdminReadAllHandler
  implements IQueryHandler<SuperAdminReadAllQuery>
{
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly superAdminRepository: SuperAdminMongooseRepository
  ) {}

  async execute({ dto }: SuperAdminReadAllQuery): Promise<{
    super_admins: SuperAdminDomain[];
    next_page_cursor: string;
  }> {
    const { page_size = 10, next_page_cursor } = dto;

    const superAdminMergedDomain = this.eventPublisher.mergeObjectContext(
      new SuperAdminDomain({})
    );

    const superAdminDomains = await this.superAdminRepository.findAll(
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

    superAdminMergedDomain.apply(new SuperAdminReadedAllEvent());
    superAdminMergedDomain.commit();

    let new_next_page_cursor = '';

    if (superAdminDomains.length >= page_size + 1) {
      const nextSuperAdmin = superAdminDomains.pop();
      new_next_page_cursor = nextSuperAdmin.id;
    }
    return {
      super_admins: superAdminDomains,
      next_page_cursor: new_next_page_cursor,
    };
  }
}
