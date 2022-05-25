import { EventPublisher, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { OrganizationMongooseRepository } from '@ustagil/api/core/account/data-access';
import { OrganizationDomain } from '@ustagil/api/core/account/typing';
import { OrganizationReadedAllEvent } from '../../event';
import { OrganizationReadAllQuery } from './organization-read-all.query';

@QueryHandler(OrganizationReadAllQuery)
export class OrganizationReadAllHandler
  implements IQueryHandler<OrganizationReadAllQuery>
{
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly organizationRepository: OrganizationMongooseRepository
  ) {}

  async execute({
    dto,
  }: OrganizationReadAllQuery): Promise<OrganizationDomain[]> {
    const organization = this.eventPublisher.mergeObjectContext(
      new OrganizationDomain({})
    );

    organization.apply(new OrganizationReadedAllEvent());
    organization.commit();

    return await this.organizationRepository.findAll();
  }
}
