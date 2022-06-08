import { EventPublisher, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserMongooseRepository } from '@ustagil/api/core/account/data-access';
import { UserDomain } from '@ustagil/api/core/account/typing';
import { UserReadedOneByEmailEvent } from '../../event';
import { UserReadOneByEmailQuery } from './user-read-one-by-email.query';

@QueryHandler(UserReadOneByEmailQuery)
export class UserReadOneByEmailHandler
  implements IQueryHandler<UserReadOneByEmailQuery>
{
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly userRepository: UserMongooseRepository
  ) {}

  async execute({ dto }: UserReadOneByEmailQuery) {
    const { email } = dto;

    const UserMergedDomain = this.eventPublisher.mergeClassContext(UserDomain);

    const foundUserDomain = await this.userRepository.findOne({ email });

    const userMergedDomain = new UserMergedDomain({
      displayName: foundUserDomain.displayName,
      email: foundUserDomain.email,
      id: foundUserDomain.id,
      organization: foundUserDomain.organization,
      password: foundUserDomain.password,
    });

    userMergedDomain.apply(new UserReadedOneByEmailEvent(userMergedDomain.id));
    userMergedDomain.commit();

    return userMergedDomain;
  }
}
