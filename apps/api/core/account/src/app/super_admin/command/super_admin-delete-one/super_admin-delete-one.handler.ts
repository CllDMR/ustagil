import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { SuperAdminMongooseRepository } from '@ustagil/api/core/account/data-access';
import { SuperAdminDomain } from '@ustagil/api/core/account/typing';
import { SuperAdminDeletedOneEvent } from '../../event';
import { SuperAdminDeleteOneCommand } from './super_admin-delete-one.command';

@CommandHandler(SuperAdminDeleteOneCommand)
export class SuperAdminDeleteOneHandler
  implements ICommandHandler<SuperAdminDeleteOneCommand>
{
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly super_adminRepository: SuperAdminMongooseRepository
  ) {}

  async execute({ dto }: SuperAdminDeleteOneCommand): Promise<void> {
    const { id } = dto;
    // const super_admin = await this.super_adminRepository.findOneById(id);

    // await this.super_adminRepository.findOneAndReplace({}, super_admin);

    const super_admin = this.eventPublisher.mergeObjectContext(
      new SuperAdminDomain({
        _id: id,
        displayName: 'displayName',
        email: 'email',
        organization: 'organization',
        password: 'password',
      })
    );

    super_admin.apply(new SuperAdminDeletedOneEvent(super_admin._id));
    super_admin.commit();
  }
}
