import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { OrganizationMongooseRepository } from '@ustagil/api/core/account/data-access';
import { OrganizationDomain } from '@ustagil/api/core/account/typing';
import { ObjectId } from 'mongodb';
import { OrganizationCreatedOneEvent } from '../../event';
import { OrganizationCreateOneCommand } from './organization-create-one.command';

@CommandHandler(OrganizationCreateOneCommand)
export class OrganizationCreateOneHandler
  implements ICommandHandler<OrganizationCreateOneCommand>
{
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly organizationRepository: OrganizationMongooseRepository
  ) {}

  async execute({ dto }: OrganizationCreateOneCommand): Promise<void> {
    const { displayName, email, organization, password } = dto;
    const a_organization = this.eventPublisher.mergeObjectContext(
      new OrganizationDomain({
        id: new ObjectId().toHexString(),
        displayName: displayName,
        email: email,
        organization: organization,
        password: password,
      })
    );

    await this.organizationRepository.create(a_organization);

    a_organization.apply(new OrganizationCreatedOneEvent(a_organization.id));
    a_organization.commit();
  }
}
