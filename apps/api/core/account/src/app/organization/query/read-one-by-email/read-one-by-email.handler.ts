import { EventPublisher, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AccountOrganizationMongooseRepository } from '@ustagil/api/core/account/data-access';
import { AccountOrganizationDomain } from '@ustagil/api/core/account/typing';
import { AccountOrganizationReadedOneByEmailEvent } from '../../event';
import { AccountOrganizationReadOneByEmailQuery } from './read-one-by-email.query';

@QueryHandler(AccountOrganizationReadOneByEmailQuery)
export class AccountOrganizationReadOneByEmailHandler
  implements IQueryHandler<AccountOrganizationReadOneByEmailQuery>
{
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly accountOrganizationRepository: AccountOrganizationMongooseRepository
  ) {}

  async execute({ dto }: AccountOrganizationReadOneByEmailQuery) {
    const { email } = dto;

    const AccountOrganizationMergedDomain =
      this.eventPublisher.mergeClassContext(AccountOrganizationDomain);

    const readedAccountOrganizationDomain =
      await this.accountOrganizationRepository.readOne({
        email,
      });

    const accountOrganizationDomain = new AccountOrganizationMergedDomain(
      readedAccountOrganizationDomain
    );

    accountOrganizationDomain.apply(
      new AccountOrganizationReadedOneByEmailEvent(accountOrganizationDomain.id)
    );
    accountOrganizationDomain.commit();

    return accountOrganizationDomain;
  }
}
