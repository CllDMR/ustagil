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

    const SuperAdminMergedDomain =
      this.eventPublisher.mergeClassContext(SuperAdminDomain);

    const foundSuperAdminDomain = await this.superAdminRepository.findOne({
      email,
    });

    const superAdminMergedDomain = new SuperAdminMergedDomain({
      displayName: foundSuperAdminDomain.displayName,
      email: foundSuperAdminDomain.email,
      id: foundSuperAdminDomain.id,
      organization: foundSuperAdminDomain.organization,
      password: foundSuperAdminDomain.password,
    });

    superAdminMergedDomain.apply(
      new SuperAdminReadedOneByEmailEvent(superAdminMergedDomain.id)
    );
    superAdminMergedDomain.commit();

    return superAdminMergedDomain;
  }
}
