import { EventPublisher, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { OrganizationMongooseRepository } from '@ustagil/api/core/account/data-access';
import { OrganizationDomain } from '@ustagil/api/core/account/typing';
import { OrganizationReadedOneEvent } from '../../event';
import { OrganizationReadOneQuery } from './organization-read-one.query';

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

    const organizationMergedDomain = new OrganizationMergedDomain({
      displayName: foundOrganizationDomain.displayName,
      email: foundOrganizationDomain.email,
      id: foundOrganizationDomain.id,
      organization: foundOrganizationDomain.organization,
      password: foundOrganizationDomain.password,
    });

    organizationMergedDomain.apply(
      new OrganizationReadedOneEvent(organizationMergedDomain.id)
    );
    organizationMergedDomain.commit();

    return organizationMergedDomain;
  }
}
