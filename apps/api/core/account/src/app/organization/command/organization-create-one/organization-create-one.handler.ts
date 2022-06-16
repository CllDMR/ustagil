import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { OrganizationMongooseRepository } from '@ustagil/api/core/account/data-access';
import { OrganizationDomain } from '@ustagil/api/core/account/typing';
import { Role } from '@ustagil/api/core/common/typing';
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

  async execute({
    dto,
  }: OrganizationCreateOneCommand): Promise<OrganizationDomain> {
    const { displayName, email, organization, password } = dto;

    const OrganizationMergedDomain =
      this.eventPublisher.mergeClassContext(OrganizationDomain);

    const createdOrganizationDomain = await this.organizationRepository.create(
      new OrganizationDomain({
        id: new ObjectId().toHexString(),
        role: Role.ROLE_ORGANIZATION,
        displayName: displayName,
        email: email,
        organization: organization,
        password: password,
      })
    );

    const organizationMergedDomain = new OrganizationMergedDomain(
      createdOrganizationDomain
    );

    organizationMergedDomain.apply(
      new OrganizationCreatedOneEvent(organizationMergedDomain.id)
    );
    organizationMergedDomain.commit();

    return organizationMergedDomain;
  }
}
