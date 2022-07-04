import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UserMongooseRepository } from '@ustagil/api/core/account/data-access';
import { UserDomain } from '@ustagil/api/core/account/typing';
import { ObjectId } from 'mongodb';
import { UserUpdatedOneEvent } from '../../event';
import { UserUpdateOneCommand } from './update-one.command';

@CommandHandler(UserUpdateOneCommand)
export class UserUpdateOneHandler
  implements ICommandHandler<UserUpdateOneCommand>
{
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly userRepository: UserMongooseRepository
  ) {}

  async execute({ dto }: UserUpdateOneCommand): Promise<UserDomain> {
    const { id, displayName, email } = dto;

    const UserMergedDomain = this.eventPublisher.mergeClassContext(UserDomain);

    const updatedUserDomain = await this.userRepository.findOneAndUpdate(
      {
        _id: new ObjectId(id),
      },
      new UserDomain({
        displayName,
        email,
      })
    );

    const userMergedDomain = new UserMergedDomain(updatedUserDomain);

    userMergedDomain.apply(new UserUpdatedOneEvent(userMergedDomain.id));
    userMergedDomain.commit();

    return updatedUserDomain;
  }
}
