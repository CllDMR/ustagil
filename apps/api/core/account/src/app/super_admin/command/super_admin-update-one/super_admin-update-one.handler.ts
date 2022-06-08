import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { SuperAdminMongooseRepository } from '@ustagil/api/core/account/data-access';
import { SuperAdminDomain } from '@ustagil/api/core/account/typing';
import { SuperAdminUpdatedOneEvent } from '../../event';
import { SuperAdminUpdateOneCommand } from './super_admin-update-one.command';

@CommandHandler(SuperAdminUpdateOneCommand)
export class SuperAdminUpdateOneHandler
  implements ICommandHandler<SuperAdminUpdateOneCommand>
{
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly superAdminRepository: SuperAdminMongooseRepository
  ) {}

  async execute({
    dto,
  }: SuperAdminUpdateOneCommand): Promise<SuperAdminDomain> {
    const { id, displayName, email, organization } = dto;

    const SuperAdminMergedDomain =
      this.eventPublisher.mergeClassContext(SuperAdminDomain);

    const updatedSuperAdminDomain =
      await this.superAdminRepository.findOneAndUpdate(
        {},
        new SuperAdminDomain({
          id,
          displayName,
          email,
          organization,
        })
      );

    const superAdminMergedDomain = new SuperAdminMergedDomain({
      displayName: updatedSuperAdminDomain.displayName,
      email: updatedSuperAdminDomain.email,
      id: updatedSuperAdminDomain.id,
      organization: updatedSuperAdminDomain.organization,
      password: updatedSuperAdminDomain.password,
    });

    superAdminMergedDomain.apply(
      new SuperAdminUpdatedOneEvent(superAdminMergedDomain.id)
    );
    superAdminMergedDomain.commit();

    return updatedSuperAdminDomain;
  }
}
