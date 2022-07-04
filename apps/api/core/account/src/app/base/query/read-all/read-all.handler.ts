import { EventPublisher, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { BaseMongooseRepository } from '@ustagil/api/core/account/data-access';
import { BaseDomain } from '@ustagil/api/core/account/typing';
import { ObjectId } from 'mongodb';
import { BaseReadedAllEvent } from '../../event';
import { BaseReadAllQuery } from './read-all.query';

@QueryHandler(BaseReadAllQuery)
export class BaseReadAllHandler implements IQueryHandler<BaseReadAllQuery> {
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly baseRepository: BaseMongooseRepository
  ) {}

  async execute({ dto }: BaseReadAllQuery): Promise<{
    bases: BaseDomain[];
    next_page_cursor: string;
  }> {
    const { page_size = 10, next_page_cursor } = dto;

    const baseMergedDomain = this.eventPublisher.mergeObjectContext(
      new BaseDomain({})
    );

    const baseDomains = await this.baseRepository.findAll(
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

    baseMergedDomain.apply(new BaseReadedAllEvent());
    baseMergedDomain.commit();

    let new_next_page_cursor = '';

    if (baseDomains.length >= page_size + 1) {
      const nextBase = baseDomains.pop();
      new_next_page_cursor = nextBase.id;
    }
    return { bases: baseDomains, next_page_cursor: new_next_page_cursor };
  }
}
