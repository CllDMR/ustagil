import { EventPublisher, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SuperAdminMongooseRepository } from '@ustagil/api/core/account/data-access';
import { SuperAdminDomain } from '@ustagil/api/core/account/typing';
import { SuperAdminReadedOneByEmailEvent } from '../../event';
import { SuperAdminReadOneByEmailQuery } from './super_admin-read-one-by-email.query';

@QueryHandler(SuperAdminReadOneByEmailQuery)
export class SuperAdminReadOneByEmailHandler
  implements IQueryHandler<SuperAdminReadOneByEmailQuery>
{
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly superAdminRepository: SuperAdminMongooseRepository
  ) {}

  async execute({ dto }: SuperAdminReadOneByEmailQuery) {
    const { email } = dto;
    const superAdminData = await this.superAdminRepository.findOne({ email });

    const super_admin = this.eventPublisher.mergeObjectContext(
      new SuperAdminDomain({
        _id: superAdminData._id,
        displayName: superAdminData.displayName,
        email: superAdminData.email,
        organization: superAdminData.organization,
        password: superAdminData.password,
      })
    );
    super_admin.apply(new SuperAdminReadedOneByEmailEvent(super_admin._id));
    super_admin.commit();

    return super_admin;
  }
}
