import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { AccountMongooseRepository } from '@ustagil/api/core/account/data-access';
import { AccountDomain } from '@ustagil/api/core/account/typing';
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

  async execute({ dto }: AccountDeleteOneCommand): Promise<void> {
    const { id } = dto;
    // const account = await this.accountRepository.findOneById(id);

    // await this.accountRepository.findOneAndReplace({}, account);

    const account = this.eventPublisher.mergeObjectContext(
      new AccountDomain({
        _id: id,
        displayName: 'displayName',
        email: 'email',
        organization: 'organization',
        password: 'password',
      })
    );

    account.apply(new AccountDeletedOneEvent(account._id));
    account.commit();
  }
}
