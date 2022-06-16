import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { AccountMongooseRepository } from '@ustagil/api/core/account/data-access';
import { AccountDomain } from '@ustagil/api/core/account/typing';
import { Role } from '@ustagil/api/core/common/typing';
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

  async execute({ dto }: AccountCreateOneCommand): Promise<AccountDomain> {
    const { displayName, email, organization, password } = dto;

    const AccountMergedDomain =
      this.eventPublisher.mergeClassContext(AccountDomain);

    const createdAccountDomain = await this.accountRepository.create(
      new AccountDomain({
        id: new ObjectId().toHexString(),
        role: Role.ROLE_ACCOUNT,
        displayName: displayName,
        email: email,
        organization: organization,
        password: password,
      })
    );

    const accountMergedDomain = new AccountMergedDomain(createdAccountDomain);

    accountMergedDomain.apply(
      new AccountCreatedOneEvent(accountMergedDomain.id)
    );
    accountMergedDomain.commit();

    return accountMergedDomain;
  }
}
