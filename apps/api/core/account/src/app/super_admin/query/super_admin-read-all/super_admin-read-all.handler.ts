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
    private readonly super_adminRepository: SuperAdminMongooseRepository
  ) {}

  async execute({ dto }: SuperAdminReadAllQuery): Promise<SuperAdminDomain[]> {
    const super_admin = this.eventPublisher.mergeObjectContext(
      new SuperAdminDomain({})
    );

    super_admin.apply(new SuperAdminReadedAllEvent());
    super_admin.commit();

    return await this.super_adminRepository.findAll();
  }
}
