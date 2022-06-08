import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { AccountMongooseRepository } from '@ustagil/api/core/account/data-access';
import { AccountDomain } from '@ustagil/api/core/account/typing';
import { AccountUpdatedOneEvent } from '../../event';
import { AccountUpdateOneCommand } from './account-update-one.command';

@CommandHandler(AccountUpdateOneCommand)
export class AccountUpdateOneHandler
  implements ICommandHandler<AccountUpdateOneCommand>
{
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly accountRepository: AccountMongooseRepository
  ) {}

  async execute({ dto }: AccountUpdateOneCommand): Promise<AccountDomain> {
    const { id, displayName, email, organization } = dto;

    const AccountMergedDomain =
      this.eventPublisher.mergeClassContext(AccountDomain);

    const updatedAccountDomain = await this.accountRepository.findOneAndUpdate(
      {},
      new AccountDomain({
        id,
        displayName,
        email,
        organization,
      })
    );

    const accountMergedDomain = new AccountMergedDomain({
      displayName: updatedAccountDomain.displayName,
      email: updatedAccountDomain.email,
      id: updatedAccountDomain.id,
      organization: updatedAccountDomain.organization,
      password: updatedAccountDomain.password,
    });

    accountMergedDomain.apply(
      new AccountUpdatedOneEvent(accountMergedDomain.id)
    );
    accountMergedDomain.commit();

    return updatedAccountDomain;
  }
}
