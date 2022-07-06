import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { AccountUserMongooseRepository } from '@ustagil/api/core/account/data-access';
import { AccountUserDomain } from '@ustagil/api/core/account/typing';
import { ObjectId } from 'mongodb';
import { AccountUserDeletedOneEvent } from '../../event';
import { AccountUserDeleteOneCommand } from './delete-one.command';

@CommandHandler(AccountUserDeleteOneCommand)
export class AccountUserDeleteOneHandler
  implements ICommandHandler<AccountUserDeleteOneCommand>
{
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly accountUserRepository: AccountUserMongooseRepository
  ) {}

  async execute({
    dto,
  }: AccountUserDeleteOneCommand): Promise<AccountUserDomain> {
    const { id } = dto;

    const AccountUserMergedDomain =
      this.eventPublisher.mergeClassContext(AccountUserDomain);

    const deletedAccountUserDomain =
      await this.accountUserRepository.readOneAndRemove({
        _id: new ObjectId(id),
      });

    const accountUserDomain = new AccountUserMergedDomain(
      deletedAccountUserDomain
    );

    accountUserDomain.apply(
      new AccountUserDeletedOneEvent(accountUserDomain.id)
    );
    accountUserDomain.commit();

    return accountUserDomain;
  }
}
