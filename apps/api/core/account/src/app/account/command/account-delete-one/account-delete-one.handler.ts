import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { AccountMongooseRepository } from '@ustagil/api/core/account/data-access';
import { AccountDomain } from '@ustagil/api/core/account/typing';
import { ObjectId } from 'mongodb';
import { AccountDeletedOneEvent } from '../../event';
import { AccountDeleteOneCommand } from './account-delete-one.command';

@CommandHandler(AccountDeleteOneCommand)
export class AccountDeleteOneHandler
  implements ICommandHandler<AccountDeleteOneCommand>
{
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly accountRepository: AccountMongooseRepository
  ) {}

  async execute({ dto }: AccountDeleteOneCommand): Promise<AccountDomain> {
    const { id } = dto;

    const AccountMergedDomain =
      this.eventPublisher.mergeClassContext(AccountDomain);

    const accountDomain = await this.accountRepository.findOneAndRemove({
      _id: new ObjectId(id),
    });

    const accountMergedDomain = new AccountMergedDomain({
      id: accountDomain.id,
      displayName: accountDomain.displayName,
      email: accountDomain.email,
      organization: accountDomain.organization,
      password: accountDomain.password,
    });

    accountMergedDomain.apply(
      new AccountDeletedOneEvent(accountMergedDomain.id)
    );
    accountMergedDomain.commit();

    return accountMergedDomain;
  }
}
