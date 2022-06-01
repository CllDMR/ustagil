import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UserMongooseRepository } from '@ustagil/api/core/account/data-access';
import { UserDomain } from '@ustagil/api/core/account/typing';
import { UserDeletedOneEvent } from '../../event';
import { UserDeleteOneCommand } from './user-delete-one.command';

@CommandHandler(UserDeleteOneCommand)
export class UserDeleteOneHandler
  implements ICommandHandler<UserDeleteOneCommand>
{
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly userRepository: UserMongooseRepository
  ) {}

  async execute({ dto }: UserDeleteOneCommand): Promise<void> {
    const { id } = dto;
    // const user = await this.userRepository.findOneById(id);

    // await this.userRepository.findOneAndReplace({}, user);

    const user = this.eventPublisher.mergeObjectContext(
      new UserDomain({
        id,
        displayName: 'displayName',
        email: 'email',
        organization: 'organization',
        password: 'password',
      })
    );

    user.apply(new UserDeletedOneEvent(user.id));
    user.commit();
  }
}
