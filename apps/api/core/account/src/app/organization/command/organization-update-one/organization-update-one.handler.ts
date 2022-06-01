import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { OrganizationMongooseRepository } from '@ustagil/api/core/account/data-access';
import { OrganizationDomain } from '@ustagil/api/core/account/typing';
import { OrganizationUpdatedOneEvent } from '../../event';
import { OrganizationUpdateOneCommand } from './organization-update-one.command';

@CommandHandler(OrganizationUpdateOneCommand)
export class OrganizationUpdateOneHandler
  implements ICommandHandler<OrganizationUpdateOneCommand>
{
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly organizationRepository: OrganizationMongooseRepository
  ) {}

  async execute({ dto }: OrganizationUpdateOneCommand): Promise<void> {
    const { id, displayName, email, organization } = dto;

    const a_organization = this.eventPublisher.mergeObjectContext(
      new OrganizationDomain({
        id,
        displayName: 'displayName',
        email: 'email',
        organization: 'organization',
        password: 'password',
      })
    );

    a_organization.displayName = displayName;
    a_organization.email = email;
    a_organization.organization = organization;

    await this.organizationRepository.findOneAndReplace({}, a_organization);

    a_organization.apply(new OrganizationUpdatedOneEvent(a_organization.id));
    a_organization.commit();
  }
}
