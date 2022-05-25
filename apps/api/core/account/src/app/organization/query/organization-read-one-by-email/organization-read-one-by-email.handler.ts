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
    const organizationData = await this.organizationRepository.findOne({
      email,
    });

    const organization = this.eventPublisher.mergeObjectContext(
      new OrganizationDomain({
        _id: organizationData._id,
        displayName: organizationData.displayName,
        email: organizationData.email,
        organization: organizationData.organization,
        password: organizationData.password,
      })
    );
    organization.apply(new OrganizationReadedOneByEmailEvent(organization._id));
    organization.commit();

    return organization;
  }
}
