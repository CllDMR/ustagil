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

  async execute({ dto }: AccountUpdateOneCommand): Promise<void> {
    const { id, displayName, email, organization } = dto;

    const account = this.eventPublisher.mergeObjectContext(
      new AccountDomain({
        id,
        displayName: 'displayName',
        email: 'email',
        organization: 'organization',
        password: 'password',
      })
    );

    account.displayName = displayName;
    account.email = email;
    account.organization = organization;

    await this.accountRepository.findOneAndReplace({}, account);

    account.apply(new AccountUpdatedOneEvent(account.id));
    account.commit();
  }
}
