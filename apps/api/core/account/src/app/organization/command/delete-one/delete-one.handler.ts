import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { OrganizationMongooseRepository } from '@ustagil/api/core/account/data-access';
import { OrganizationDomain } from '@ustagil/api/core/account/typing';
import { ObjectId } from 'mongodb';
import { OrganizationDeletedOneEvent } from '../../event';
import { OrganizationDeleteOneCommand } from './delete-one.command';

@CommandHandler(OrganizationDeleteOneCommand)
export class OrganizationDeleteOneHandler
  implements ICommandHandler<OrganizationDeleteOneCommand>
{
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly organizationRepository: OrganizationMongooseRepository
  ) {}

  async execute({
    dto,
  }: OrganizationDeleteOneCommand): Promise<OrganizationDomain> {
    const { id } = dto;

    const OrganizationMergedDomain =
      this.eventPublisher.mergeClassContext(OrganizationDomain);

    const deletedOrganizationDomain =
      await this.organizationRepository.findOneAndRemove({
        _id: new ObjectId(id),
      });

    const organizationMergedDomain = new OrganizationMergedDomain(
      deletedOrganizationDomain
    );

    organizationMergedDomain.apply(
      new OrganizationDeletedOneEvent(organizationMergedDomain.id)
    );
    organizationMergedDomain.commit();

    return organizationMergedDomain;
  }
}
