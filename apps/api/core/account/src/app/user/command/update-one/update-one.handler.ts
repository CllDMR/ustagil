import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { AccountUserMongooseRepository } from '@ustagil/api/core/account/data-access';
import { AccountUserDomain } from '@ustagil/api/core/account/typing';
import { ObjectId } from 'mongodb';
import { AccountUserUpdatedOneEvent } from '../../event';
import { AccountUserUpdateOneCommand } from './update-one.command';

@CommandHandler(AccountUserUpdateOneCommand)
export class AccountUserUpdateOneHandler
  implements ICommandHandler<AccountUserUpdateOneCommand>
{
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly accountUserRepository: AccountUserMongooseRepository
  ) {}

  async execute({
    dto,
  }: AccountUserUpdateOneCommand): Promise<AccountUserDomain> {
    const { id, displayName, email } = dto;

    const AccountUserMergedDomain =
      this.eventPublisher.mergeClassContext(AccountUserDomain);

    const updatedAccountUserDomain =
      await this.accountUserRepository.readOneAndUpdate(
        {
          _id: new ObjectId(id),
        },
        new AccountUserDomain({
          displayName,
          email,
        })
      );

    const accountUserDomain = new AccountUserMergedDomain(
      updatedAccountUserDomain
    );

    accountUserDomain.apply(
      new AccountUserUpdatedOneEvent(accountUserDomain.id)
    );
    accountUserDomain.commit();

    return updatedAccountUserDomain;
  }
}
