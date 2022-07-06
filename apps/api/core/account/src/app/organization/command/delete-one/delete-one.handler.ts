import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { AccountOrganizationMongooseRepository } from '@ustagil/api/core/account/data-access';
import { AccountOrganizationDomain } from '@ustagil/api/core/account/typing';
import { ObjectId } from 'mongodb';
import { AccountOrganizationDeletedOneEvent } from '../../event';
import { AccountOrganizationDeleteOneCommand } from './delete-one.command';

@CommandHandler(AccountOrganizationDeleteOneCommand)
export class AccountOrganizationDeleteOneHandler
  implements ICommandHandler<AccountOrganizationDeleteOneCommand>
{
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly accountOrganizationRepository: AccountOrganizationMongooseRepository
  ) {}

  async execute({
    dto,
  }: AccountOrganizationDeleteOneCommand): Promise<AccountOrganizationDomain> {
    const { id } = dto;

    const AccountOrganizationMergedDomain =
      this.eventPublisher.mergeClassContext(AccountOrganizationDomain);

    const deletedAccountOrganizationDomain =
      await this.accountOrganizationRepository.readOneAndRemove({
        _id: new ObjectId(id),
      });

    const accountOrganizationDomain = new AccountOrganizationMergedDomain(
      deletedAccountOrganizationDomain
    );

    accountOrganizationDomain.apply(
      new AccountOrganizationDeletedOneEvent(accountOrganizationDomain.id)
    );
    accountOrganizationDomain.commit();

    return accountOrganizationDomain;
  }
}
