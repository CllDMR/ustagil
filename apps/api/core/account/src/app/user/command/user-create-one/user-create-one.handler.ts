import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UserMongooseRepository } from '@ustagil/api/core/account/data-access';
import { UserDomain } from '@ustagil/api/core/account/typing';
import { Role } from '@ustagil/api/core/common/typing';
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

  async execute({ dto }: UserCreateOneCommand): Promise<UserDomain> {
    const { displayName, email, password } = dto;

    const UserMergedDomain = this.eventPublisher.mergeClassContext(UserDomain);

    const createdUserDomain = await this.userRepository.create(
      new UserDomain({
        id: new ObjectId().toHexString(),
        role: Role.ROLE_USER,
        displayName: displayName,
        email: email,
        password: password,
      })
    );

    const userMergedDomain = new UserMergedDomain(createdUserDomain);

    userMergedDomain.apply(new UserCreatedOneEvent(userMergedDomain.id));
    userMergedDomain.commit();

    return userMergedDomain;
  }
}
