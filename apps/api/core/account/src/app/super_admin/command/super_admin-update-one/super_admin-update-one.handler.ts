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
    private readonly super_adminRepository: SuperAdminMongooseRepository
  ) {}

  async execute({ dto }: SuperAdminUpdateOneCommand): Promise<void> {
    const { id, displayName, email, organization } = dto;

    const super_admin = this.eventPublisher.mergeObjectContext(
      new SuperAdminDomain({
        id,
        displayName: 'displayName',
        email: 'email',
        organization: 'organization',
        password: 'password',
      })
    );

    super_admin.displayName = displayName;
    super_admin.email = email;
    super_admin.organization = organization;

    await this.super_adminRepository.findOneAndReplace({}, super_admin);

    super_admin.apply(new SuperAdminUpdatedOneEvent(super_admin.id));
    super_admin.commit();
  }
}
