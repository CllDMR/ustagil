import { EventPublisher, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserMongooseRepository } from '@ustagil/api/core/account/data-access';
import { UserDomain } from '@ustagil/api/core/account/typing';
import { UserReadedAllEvent } from '../../event';
import { UserReadAllQuery } from './user-read-all.query';

@QueryHandler(UserReadAllQuery)
export class UserReadAllHandler implements IQueryHandler<UserReadAllQuery> {
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly userRepository: UserMongooseRepository
  ) {}

  async execute({ dto }: UserReadAllQuery): Promise<UserDomain[]> {
    const userMergedDomain = this.eventPublisher.mergeObjectContext(
      new UserDomain({})
    );

    const userDomains = await this.userRepository.findAll();

    userMergedDomain.apply(new UserReadedAllEvent());
    userMergedDomain.commit();

    return userDomains;
  }
}
