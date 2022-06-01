import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UserMongooseRepository } from '@ustagil/api/core/account/data-access';
import { UserDomain } from '@ustagil/api/core/account/typing';
import { ObjectId } from 'mongodb';
import { UserCreatedOneEvent } from '../../event';
import { UserCreateOneCommand } from './user-create-one.command';

@CommandHandler(UserCreateOneCommand)
export class UserCreateOneHandler
  implements ICommandHandler<UserCreateOneCommand>
{
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly userRepository: UserMongooseRepository
  ) {}

  async execute({ dto }: UserCreateOneCommand): Promise<void> {
    const { displayName, email, organization, password } = dto;
    const user = this.eventPublisher.mergeObjectContext(
      new UserDomain({
        id: new ObjectId().toHexString(),
        displayName: displayName,
        email: email,
        organization: organization,
        password: password,
      })
    );

    await this.userRepository.create(user);

    user.apply(new UserCreatedOneEvent(user.id));
    user.commit();
  }
}
