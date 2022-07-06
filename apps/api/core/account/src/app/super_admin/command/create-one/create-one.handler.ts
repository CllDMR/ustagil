import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { AccountSuperAdminMongooseRepository } from '@ustagil/api/core/account/data-access';
import { AccountSuperAdminDomain } from '@ustagil/api/core/account/typing';
import { Role } from '@ustagil/api/core/common/typing';
import { ObjectId } from 'mongodb';
import { AccountSuperAdminCreatedOneEvent } from '../../event';
import { AccountSuperAdminCreateOneCommand } from './create-one.command';

@CommandHandler(AccountSuperAdminCreateOneCommand)
export class AccountSuperAdminCreateOneHandler
  implements ICommandHandler<AccountSuperAdminCreateOneCommand>
{
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly accountSuperAdminRepository: AccountSuperAdminMongooseRepository
  ) {}

  async execute({
    dto,
  }: AccountSuperAdminCreateOneCommand): Promise<AccountSuperAdminDomain> {
    const { displayName, email, password } = dto;

    const AccountSuperAdminMergedDomain = this.eventPublisher.mergeClassContext(
      AccountSuperAdminDomain
    );

    const createdAccountSuperAdminDomain =
      await this.accountSuperAdminRepository.create(
        new AccountSuperAdminDomain({
          id: new ObjectId().toHexString(),
          role: Role.ROLE_SUPER_ADMIN,
          displayName: displayName,
          email: email,
          password: password,
        })
      );

    const accountSuperAdminDomain = new AccountSuperAdminMergedDomain(
      createdAccountSuperAdminDomain
    );

    accountSuperAdminDomain.apply(
      new AccountSuperAdminCreatedOneEvent(accountSuperAdminDomain.id)
    );
    accountSuperAdminDomain.commit();

    return accountSuperAdminDomain;
  }
}
