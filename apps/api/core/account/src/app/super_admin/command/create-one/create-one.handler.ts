import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { SuperAdminMongooseRepository } from '@ustagil/api/core/account/data-access';
import { SuperAdminDomain } from '@ustagil/api/core/account/typing';
import { Role } from '@ustagil/api/core/common/typing';
import { ObjectId } from 'mongodb';
import { SuperAdminCreatedOneEvent } from '../../event';
import { SuperAdminCreateOneCommand } from './create-one.command';

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
    const { displayName, email, password } = dto;

    const SuperAdminMergedDomain =
      this.eventPublisher.mergeClassContext(SuperAdminDomain);

    const createdSuperAdminDomain = await this.superAdminRepository.create(
      new SuperAdminDomain({
        id: new ObjectId().toHexString(),
        role: Role.ROLE_SUPER_ADMIN,
        displayName: displayName,
        email: email,
        password: password,
      })
    );

    const superAdminMergedDomain = new SuperAdminMergedDomain(
      createdSuperAdminDomain
    );

    superAdminMergedDomain.apply(
      new SuperAdminCreatedOneEvent(superAdminMergedDomain.id)
    );
    superAdminMergedDomain.commit();

    return superAdminMergedDomain;
  }
}