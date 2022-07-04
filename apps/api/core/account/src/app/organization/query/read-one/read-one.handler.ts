import { EventPublisher, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { OrganizationMongooseRepository } from '@ustagil/api/core/account/data-access';
import { OrganizationDomain } from '@ustagil/api/core/account/typing';
import { OrganizationReadedOneEvent } from '../../event';
import { OrganizationReadOneQuery } from './read-one.query';

@QueryHandler(OrganizationReadOneQuery)
export class OrganizationReadOneHandler
  implements IQueryHandler<OrganizationReadOneQuery>
{
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly organizationRepository: OrganizationMongooseRepository
  ) {}

  async execute({
    dto,
  }: OrganizationReadOneQuery): Promise<OrganizationDomain> {
    const { id } = dto;

    const OrganizationMergedDomain =
      this.eventPublisher.mergeClassContext(OrganizationDomain);

    const foundOrganizationDomain =
      await this.organizationRepository.findOneById(id);

    const organizationMergedDomain = new OrganizationMergedDomain(
      foundOrganizationDomain
    );

    organizationMergedDomain.apply(
      new OrganizationReadedOneEvent(organizationMergedDomain.id)
    );
    organizationMergedDomain.commit();

    return organizationMergedDomain;
  }
}