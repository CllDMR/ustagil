import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UserMongooseRepository } from '@ustagil/api/core/account/data-access';
import { UserDomain } from '@ustagil/api/core/account/typing';
import { UserUpdatedOneEvent } from '../../event';
import { UserUpdateOneCommand } from './user-update-one.command';

@CommandHandler(UserUpdateOneCommand)
export class UserUpdateOneHandler
  implements ICommandHandler<UserUpdateOneCommand>
{
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly userRepository: UserMongooseRepository
  ) {}

  async execute({ dto }: UserUpdateOneCommand): Promise<void> {
    const { id, displayName, email, organization } = dto;

    const user = this.eventPublisher.mergeObjectContext(
      new UserDomain({
        id,
        displayName: 'displayName',
        email: 'email',
        organization: 'organization',
        password: 'password',
      })
    );

    user.displayName = displayName;
    user.email = email;
    user.organization = organization;

    await this.userRepository.findOneAndReplace({}, user);

    user.apply(new UserUpdatedOneEvent(user.id));
    user.commit();
  }
}
