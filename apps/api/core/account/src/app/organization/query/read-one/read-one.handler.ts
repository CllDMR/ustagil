import { EventPublisher, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AccountOrganizationMongooseRepository } from '@ustagil/api/core/account/data-access';
import { AccountOrganizationDomain } from '@ustagil/api/core/account/typing';
import { AccountOrganizationReadedOneEvent } from '../../event';
import { AccountOrganizationReadOneQuery } from './read-one.query';

@QueryHandler(AccountOrganizationReadOneQuery)
export class AccountOrganizationReadOneHandler
  implements IQueryHandler<AccountOrganizationReadOneQuery>
{
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly accountOrganizationRepository: AccountOrganizationMongooseRepository
  ) {}

  async execute({
    dto,
  }: AccountOrganizationReadOneQuery): Promise<AccountOrganizationDomain> {
    const { id } = dto;

    const AccountOrganizationMergedDomain =
      this.eventPublisher.mergeClassContext(AccountOrganizationDomain);

    const readedAccountOrganizationDomain =
      await this.accountOrganizationRepository.readOneById(id);

    const accountOrganizationDomain = new AccountOrganizationMergedDomain(
      readedAccountOrganizationDomain
    );

    accountOrganizationDomain.apply(
      new AccountOrganizationReadedOneEvent(accountOrganizationDomain.id)
    );
    accountOrganizationDomain.commit();

    return accountOrganizationDomain;
  }
}
