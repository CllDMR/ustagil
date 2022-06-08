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

  async execute({
    dto,
  }: OrganizationUpdateOneCommand): Promise<OrganizationDomain> {
    const { id, displayName, email, organization } = dto;

    const OrganizationMergedDomain =
      this.eventPublisher.mergeClassContext(OrganizationDomain);

    const updatedOrganizationDomain =
      await this.organizationRepository.findOneAndUpdate(
        {},
        new OrganizationDomain({
          id,
          displayName,
          email,
          organization,
        })
      );

    const organizationMergedDomain = new OrganizationMergedDomain({
      displayName: updatedOrganizationDomain.displayName,
      email: updatedOrganizationDomain.email,
      id: updatedOrganizationDomain.id,
      organization: updatedOrganizationDomain.organization,
      password: updatedOrganizationDomain.password,
    });

    organizationMergedDomain.apply(
      new OrganizationUpdatedOneEvent(organizationMergedDomain.id)
    );
    organizationMergedDomain.commit();

    return updatedOrganizationDomain;
  }
}
