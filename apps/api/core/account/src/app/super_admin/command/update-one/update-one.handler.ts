import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { AccountSuperAdminMongooseRepository } from '@ustagil/api/core/account/data-access';
import { AccountSuperAdminDomain } from '@ustagil/api/core/account/typing';
import { ObjectId } from 'mongodb';
import { AccountSuperAdminUpdatedOneEvent } from '../../event';
import { AccountSuperAdminUpdateOneCommand } from './update-one.command';

@CommandHandler(AccountSuperAdminUpdateOneCommand)
export class AccountSuperAdminUpdateOneHandler
  implements ICommandHandler<AccountSuperAdminUpdateOneCommand>
{
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly accountSuperAdminRepository: AccountSuperAdminMongooseRepository
  ) {}

  async execute({
    dto,
  }: AccountSuperAdminUpdateOneCommand): Promise<AccountSuperAdminDomain> {
    const { id, displayName, email } = dto;

    const AccountSuperAdminMergedDomain = this.eventPublisher.mergeClassContext(
      AccountSuperAdminDomain
    );

    const updatedAccountSuperAdminDomain =
      await this.accountSuperAdminRepository.readOneAndUpdate(
        {
          _id: new ObjectId(id),
        },
        new AccountSuperAdminDomain({
          displayName,
          email,
        })
      );

    const accountSuperAdminDomain = new AccountSuperAdminMergedDomain(
      updatedAccountSuperAdminDomain
    );

    accountSuperAdminDomain.apply(
      new AccountSuperAdminUpdatedOneEvent(accountSuperAdminDomain.id)
    );
    accountSuperAdminDomain.commit();

    return updatedAccountSuperAdminDomain;
  }
}
