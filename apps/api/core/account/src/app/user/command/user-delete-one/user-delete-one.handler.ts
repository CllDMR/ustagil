import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UserMongooseRepository } from '@ustagil/api/core/account/data-access';
import { UserDomain } from '@ustagil/api/core/account/typing';
import { ObjectId } from 'mongodb';
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

  async execute({ dto }: UserDeleteOneCommand): Promise<UserDomain> {
    const { id } = dto;

    const UserMergedDomain = this.eventPublisher.mergeClassContext(UserDomain);

    const userDomain = await this.userRepository.findOneAndRemove({
      _id: new ObjectId(id),
    });

    const userMergedDomain = new UserMergedDomain({
      id: userDomain.id,
      displayName: userDomain.displayName,
      email: userDomain.email,
      organization: userDomain.organization,
      password: userDomain.password,
    });

    userMergedDomain.apply(new UserDeletedOneEvent(userMergedDomain.id));
    userMergedDomain.commit();

    return userMergedDomain;
  }
}
