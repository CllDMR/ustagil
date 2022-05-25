import { EventPublisher, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserMongooseRepository } from '@ustagil/api/core/account/data-access';
import { UserDomain } from '@ustagil/api/core/account/typing';
import { UserReadedOneEvent } from '../../event';
import { UserReadOneQuery } from './user-read-one.query';

@QueryHandler(UserReadOneQuery)
export class UserReadOneHandler implements IQueryHandler<UserReadOneQuery> {
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly userRepository: UserMongooseRepository
  ) {}

  async execute({ dto }: UserReadOneQuery): Promise<UserDomain> {
    const { id } = dto;
    const user = this.eventPublisher.mergeObjectContext(new UserDomain({}));

    user.apply(new UserReadedOneEvent(id));
    user.commit();

    return await this.userRepository.findOneById(id);
  }
}
