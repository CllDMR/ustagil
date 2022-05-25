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
    const organization = this.eventPublisher.mergeObjectContext(
      new OrganizationDomain({})
    );

    organization.apply(new OrganizationReadedOneEvent(id));
    organization.commit();

    return await this.organizationRepository.findOneById(id);
  }
}
