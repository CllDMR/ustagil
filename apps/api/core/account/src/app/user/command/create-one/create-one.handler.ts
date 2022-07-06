import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { AccountUserMongooseRepository } from '@ustagil/api/core/account/data-access';
import { AccountUserDomain } from '@ustagil/api/core/account/typing';
import { Role } from '@ustagil/api/core/common/typing';
import { ObjectId } from 'mongodb';
import { AccountUserCreatedOneEvent } from '../../event';
import { AccountUserCreateOneCommand } from './create-one.command';

@CommandHandler(AccountUserCreateOneCommand)
export class AccountUserCreateOneHandler
  implements ICommandHandler<AccountUserCreateOneCommand>
{
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly accountUserRepository: AccountUserMongooseRepository
  ) {}

  async execute({
    dto,
  }: AccountUserCreateOneCommand): Promise<AccountUserDomain> {
    const { displayName, email, password } = dto;

    const AccountUserMergedDomain =
      this.eventPublisher.mergeClassContext(AccountUserDomain);

    const createdAccountUserDomain = await this.accountUserRepository.create(
      new AccountUserDomain({
        id: new ObjectId().toHexString(),
        role: Role.ROLE_USER,
        displayName: displayName,
        email: email,
        password: password,
      })
    );

    const accountUserDomain = new AccountUserMergedDomain(
      createdAccountUserDomain
    );

    accountUserDomain.apply(
      new AccountUserCreatedOneEvent(accountUserDomain.id)
    );
    accountUserDomain.commit();

    return accountUserDomain;
  }
}
