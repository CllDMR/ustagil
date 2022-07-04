import { EventPublisher, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserMongooseRepository } from '@ustagil/api/core/account/data-access';
import { UserDomain } from '@ustagil/api/core/account/typing';
import { ObjectId } from 'mongodb';
import { UserReadedAllEvent } from '../../event';
import { UserReadAllQuery } from './read-all.query';

@QueryHandler(UserReadAllQuery)
export class UserReadAllHandler implements IQueryHandler<UserReadAllQuery> {
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly userRepository: UserMongooseRepository
  ) {}

  async execute({ dto }: UserReadAllQuery): Promise<{
    users: UserDomain[];
    next_page_cursor: string;
  }> {
    const { page_size = 10, next_page_cursor } = dto;

    const userMergedDomain = this.eventPublisher.mergeObjectContext(
      new UserDomain({})
    );

    const userDomains = await this.userRepository.findAll(
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

    userMergedDomain.apply(new UserReadedAllEvent());
    userMergedDomain.commit();

    let new_next_page_cursor = '';

    if (userDomains.length >= page_size + 1) {
      const nextUser = userDomains.pop();
      new_next_page_cursor = nextUser.id;
    }
    return { users: userDomains, next_page_cursor: new_next_page_cursor };
  }
}
