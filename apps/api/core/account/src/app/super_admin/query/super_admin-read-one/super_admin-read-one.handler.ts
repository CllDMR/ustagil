import { EventPublisher, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SuperAdminMongooseRepository } from '@ustagil/api/core/account/data-access';
import { SuperAdminDomain } from '@ustagil/api/core/account/typing';
import { SuperAdminReadedOneEvent } from '../../event';
import { SuperAdminReadOneQuery } from './super_admin-read-one.query';

@QueryHandler(SuperAdminReadOneQuery)
export class SuperAdminReadOneHandler
  implements IQueryHandler<SuperAdminReadOneQuery>
{
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly super_adminRepository: SuperAdminMongooseRepository
  ) {}

  async execute({ dto }: SuperAdminReadOneQuery): Promise<SuperAdminDomain> {
    const { id } = dto;
    const super_admin = this.eventPublisher.mergeObjectContext(
      new SuperAdminDomain({})
    );

    super_admin.apply(new SuperAdminReadedOneEvent(id));
    super_admin.commit();

    return await this.super_adminRepository.findOneById(id);
  }
}
