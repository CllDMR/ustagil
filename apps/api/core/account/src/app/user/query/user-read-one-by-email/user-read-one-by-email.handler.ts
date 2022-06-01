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
    const userData = await this.userRepository.findOne({ email });

    const user = this.eventPublisher.mergeObjectContext(
      new UserDomain({
        id: userData.id,
        displayName: userData.displayName,
        email: userData.email,
        organization: userData.organization,
        password: userData.password,
      })
    );
    user.apply(new UserReadedOneByEmailEvent(user.id));
    user.commit();

    return user;
  }
}
