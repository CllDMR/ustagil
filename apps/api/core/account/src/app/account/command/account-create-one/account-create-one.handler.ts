import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { AccountMongooseRepository } from '@ustagil/api/core/account/data-access';
import { AccountDomain } from '@ustagil/api/core/account/typing';
import { ObjectId } from 'mongodb';
import { AccountCreatedOneEvent } from '../../event';
import { AccountCreateOneCommand } from './account-create-one.command';

@CommandHandler(AccountCreateOneCommand)
export class AccountCreateOneHandler
  implements ICommandHandler<AccountCreateOneCommand>
{
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly accountRepository: AccountMongooseRepository
  ) {}

  async execute({ dto }: AccountCreateOneCommand): Promise<void> {
    const { displayName, email, organization, password } = dto;
    const account = this.eventPublisher.mergeObjectContext(
      new AccountDomain({
        id: new ObjectId().toHexString(),
        displayName: displayName,
        email: email,
        organization: organization,
        password: password,
      })
    );

    await this.accountRepository.create(account);

    account.apply(new AccountCreatedOneEvent(account.id));
    account.commit();
  }
}
