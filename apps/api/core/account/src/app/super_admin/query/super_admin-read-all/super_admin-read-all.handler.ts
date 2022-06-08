import { EventPublisher, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SuperAdminMongooseRepository } from '@ustagil/api/core/account/data-access';
import { SuperAdminDomain } from '@ustagil/api/core/account/typing';
import { SuperAdminReadedAllEvent } from '../../event';
import { SuperAdminReadAllQuery } from './super_admin-read-all.query';

@QueryHandler(SuperAdminReadAllQuery)
export class SuperAdminReadAllHandler
  implements IQueryHandler<SuperAdminReadAllQuery>
{
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly superAdminRepository: SuperAdminMongooseRepository
  ) {}

  async execute({ dto }: SuperAdminReadAllQuery): Promise<SuperAdminDomain[]> {
    const superAdminMergedDomain = this.eventPublisher.mergeObjectContext(
      new SuperAdminDomain({})
    );

    const superAdminDomains = await this.superAdminRepository.findAll();

    superAdminMergedDomain.apply(new SuperAdminReadedAllEvent());
    superAdminMergedDomain.commit();

    return superAdminDomains;
  }
}
