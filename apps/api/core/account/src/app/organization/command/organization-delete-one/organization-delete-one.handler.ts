import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { OrganizationMongooseRepository } from '@ustagil/api/core/account/data-access';
import { OrganizationDomain } from '@ustagil/api/core/account/typing';
import { OrganizationDeletedOneEvent } from '../../event';
import { OrganizationDeleteOneCommand } from './organization-delete-one.command';

@CommandHandler(OrganizationDeleteOneCommand)
export class OrganizationDeleteOneHandler
  implements ICommandHandler<OrganizationDeleteOneCommand>
{
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly organizationRepository: OrganizationMongooseRepository
  ) {}

  async execute({ dto }: OrganizationDeleteOneCommand): Promise<void> {
    const { id } = dto;
    // const organization = await this.organizationRepository.findOneById(id);

    // await this.organizationRepository.findOneAndReplace({}, organization);

    const organization = this.eventPublisher.mergeObjectContext(
      new OrganizationDomain({
        _id: id,
        displayName: 'displayName',
        email: 'email',
        organization: 'organization',
        password: 'password',
      })
    );

    organization.apply(new OrganizationDeletedOneEvent(organization._id));
    organization.commit();
  }
}
