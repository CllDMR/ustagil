import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { SuperAdminMongooseRepository } from '@ustagil/api/core/account/data-access';
import { SuperAdminDomain } from '@ustagil/api/core/account/typing';
import { ObjectId } from 'mongodb';
import { SuperAdminCreatedOneEvent } from '../../event';
import { SuperAdminCreateOneCommand } from './super_admin-create-one.command';

@CommandHandler(SuperAdminCreateOneCommand)
export class SuperAdminCreateOneHandler
  implements ICommandHandler<SuperAdminCreateOneCommand>
{
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly superAdminRepository: SuperAdminMongooseRepository
  ) {}

  async execute({
    dto,
  }: SuperAdminCreateOneCommand): Promise<SuperAdminDomain> {
    const { displayName, email, organization, password } = dto;

    const SuperAdminMergedDomain =
      this.eventPublisher.mergeClassContext(SuperAdminDomain);

    const createdSuperAdminDomain = await this.superAdminRepository.create(
      new SuperAdminDomain({
        id: new ObjectId().toHexString(),
        displayName: displayName,
        email: email,
        organization: organization,
        password: password,
      })
    );

    const superAdminMergedDomain = new SuperAdminMergedDomain({
      displayName: createdSuperAdminDomain.displayName,
      email: createdSuperAdminDomain.email,
      id: createdSuperAdminDomain.id,
      organization: createdSuperAdminDomain.organization,
      password: createdSuperAdminDomain.password,
    });

    superAdminMergedDomain.apply(
      new SuperAdminCreatedOneEvent(superAdminMergedDomain.id)
    );
    superAdminMergedDomain.commit();

    return superAdminMergedDomain;
  }
}
