import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { AccountSuperAdminMongooseRepository } from '@ustagil/api/core/account/data-access';
import { AccountSuperAdminDomain } from '@ustagil/api/core/account/typing';
import { ObjectId } from 'mongodb';
import { AccountSuperAdminDeletedOneEvent } from '../../event';
import { AccountSuperAdminDeleteOneCommand } from './delete-one.command';

@CommandHandler(AccountSuperAdminDeleteOneCommand)
export class AccountSuperAdminDeleteOneHandler
  implements ICommandHandler<AccountSuperAdminDeleteOneCommand>
{
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly accountSuperAdminRepository: AccountSuperAdminMongooseRepository
  ) {}

  async execute({
    dto,
  }: AccountSuperAdminDeleteOneCommand): Promise<AccountSuperAdminDomain> {
    const { id } = dto;

    const AccountSuperAdminMergedDomain = this.eventPublisher.mergeClassContext(
      AccountSuperAdminDomain
    );

    const deletedAccountSuperAdminDomain =
      await this.accountSuperAdminRepository.readOneAndRemove({
        _id: new ObjectId(id),
      });

    const accountSuperAdminDomain = new AccountSuperAdminMergedDomain(
      deletedAccountSuperAdminDomain
    );

    accountSuperAdminDomain.apply(
      new AccountSuperAdminDeletedOneEvent(accountSuperAdminDomain.id)
    );
    accountSuperAdminDomain.commit();

    return accountSuperAdminDomain;
  }
}
