import { EventPublisher, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SuperAdminMongooseRepository } from '@ustagil/api/core/account/data-access';
import { SuperAdminDomain } from '@ustagil/api/core/account/typing';
import { SuperAdminReadedOneEvent } from '../../event';
import { SuperAdminReadOneQuery } from './read-one.query';

@QueryHandler(SuperAdminReadOneQuery)
export class SuperAdminReadOneHandler
  implements IQueryHandler<SuperAdminReadOneQuery>
{
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly superAdminRepository: SuperAdminMongooseRepository
  ) {}

  async execute({ dto }: SuperAdminReadOneQuery): Promise<SuperAdminDomain> {
    const { id } = dto;

    const SuperAdminMergedDomain =
      this.eventPublisher.mergeClassContext(SuperAdminDomain);

    const foundSuperAdminDomain = await this.superAdminRepository.findOneById(
      id
    );

    const superAdminMergedDomain = new SuperAdminMergedDomain(
      foundSuperAdminDomain
    );

    superAdminMergedDomain.apply(
      new SuperAdminReadedOneEvent(superAdminMergedDomain.id)
    );
    superAdminMergedDomain.commit();

    return superAdminMergedDomain;
  }
}
