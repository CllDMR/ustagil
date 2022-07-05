import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { AccountOrganizationMongooseRepository } from '@ustagil/api/core/account/data-access';
import { AccountOrganizationDomain } from '@ustagil/api/core/account/typing';
import { Role } from '@ustagil/api/core/common/typing';
import { ObjectId } from 'mongodb';
import { AccountOrganizationCreatedOneEvent } from '../../event';
import { AccountOrganizationCreateOneCommand } from './create-one.command';

@CommandHandler(AccountOrganizationCreateOneCommand)
export class AccountOrganizationCreateOneHandler
  implements ICommandHandler<AccountOrganizationCreateOneCommand>
{
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly accountOrganizationRepository: AccountOrganizationMongooseRepository
  ) {}

  async execute({
    dto,
  }: AccountOrganizationCreateOneCommand): Promise<AccountOrganizationDomain> {
    const { displayName, email, organization, password } = dto;

    const AccountOrganizationMergedDomain =
      this.eventPublisher.mergeClassContext(AccountOrganizationDomain);

    const createdAccountOrganizationDomain =
      await this.accountOrganizationRepository.create(
        new AccountOrganizationDomain({
          id: new ObjectId().toHexString(),
          role: Role.ROLE_ORGANIZATION,
          displayName: displayName,
          email: email,
          organization: organization,
          password: password,
        })
      );

    const accountOrganizationDomain = new AccountOrganizationMergedDomain(
      createdAccountOrganizationDomain
    );

    accountOrganizationDomain.apply(
      new AccountOrganizationCreatedOneEvent(accountOrganizationDomain.id)
    );
    accountOrganizationDomain.commit();

    return accountOrganizationDomain;
  }
}
