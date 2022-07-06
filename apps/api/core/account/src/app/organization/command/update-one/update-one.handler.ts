import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { AccountOrganizationMongooseRepository } from '@ustagil/api/core/account/data-access';
import { AccountOrganizationDomain } from '@ustagil/api/core/account/typing';
import { ObjectId } from 'mongodb';
import { AccountOrganizationUpdatedOneEvent } from '../../event';
import { AccountOrganizationUpdateOneCommand } from './update-one.command';

@CommandHandler(AccountOrganizationUpdateOneCommand)
export class AccountOrganizationUpdateOneHandler
  implements ICommandHandler<AccountOrganizationUpdateOneCommand>
{
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly accountOrganizationRepository: AccountOrganizationMongooseRepository
  ) {}

  async execute({
    dto,
  }: AccountOrganizationUpdateOneCommand): Promise<AccountOrganizationDomain> {
    const { id, displayName, email, organization } = dto;

    const AccountOrganizationMergedDomain =
      this.eventPublisher.mergeClassContext(AccountOrganizationDomain);

    const updatedAccountOrganizationDomain =
      await this.accountOrganizationRepository.readOneAndUpdate(
        {
          _id: new ObjectId(id),
        },
        new AccountOrganizationDomain({
          displayName,
          email,
          organization,
        })
      );

    const accountOrganizationDomain = new AccountOrganizationMergedDomain(
      updatedAccountOrganizationDomain
    );

    accountOrganizationDomain.apply(
      new AccountOrganizationUpdatedOneEvent(accountOrganizationDomain.id)
    );
    accountOrganizationDomain.commit();

    return updatedAccountOrganizationDomain;
  }
}
