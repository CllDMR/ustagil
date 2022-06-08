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

    const UserMergedDomain = this.eventPublisher.mergeClassContext(UserDomain);

    const foundUserDomain = await this.userRepository.findOneById(id);

    const userMergedDomain = new UserMergedDomain({
      displayName: foundUserDomain.displayName,
      email: foundUserDomain.email,
      id: foundUserDomain.id,
      organization: foundUserDomain.organization,
      password: foundUserDomain.password,
    });

    userMergedDomain.apply(new UserReadedOneEvent(userMergedDomain.id));
    userMergedDomain.commit();

    return userMergedDomain;
  }
}