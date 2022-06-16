import { EventPublisher, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { OrganizationMongooseRepository } from '@ustagil/api/core/account/data-access';
import { OrganizationDomain } from '@ustagil/api/core/account/typing';
import { OrganizationReadedOneByEmailEvent } from '../../event';
import { OrganizationReadOneByEmailQuery } from './organization-read-one-by-email.query';

@QueryHandler(OrganizationReadOneByEmailQuery)
export class OrganizationReadOneByEmailHandler
  implements IQueryHandler<OrganizationReadOneByEmailQuery>
{
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly organizationRepository: OrganizationMongooseRepository
  ) {}

  async execute({ dto }: OrganizationReadOneByEmailQuery) {
    const { email } = dto;

    const OrganizationMergedDomain =
      this.eventPublisher.mergeClassContext(OrganizationDomain);

    const foundOrganizationDomain = await this.organizationRepository.findOne({
      email,
    });

    const organizationMergedDomain = new OrganizationMergedDomain(
      foundOrganizationDomain
    );

    organizationMergedDomain.apply(
      new OrganizationReadedOneByEmailEvent(organizationMergedDomain.id)
    );
    organizationMergedDomain.commit();

    return organizationMergedDomain;
  }
}
