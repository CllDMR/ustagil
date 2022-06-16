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

  async execute({ dto }: UserUpdateOneCommand): Promise<UserDomain> {
    const { id, displayName, email, organization } = dto;

    const UserMergedDomain = this.eventPublisher.mergeClassContext(UserDomain);

    const updatedUserDomain = await this.userRepository.findOneAndUpdate(
      {},
      new UserDomain({
        id,
        displayName,
        email,
        organization,
      })
    );

    const userMergedDomain = new UserMergedDomain(updatedUserDomain);

    userMergedDomain.apply(new UserUpdatedOneEvent(userMergedDomain.id));
    userMergedDomain.commit();

    return updatedUserDomain;
  }
}
