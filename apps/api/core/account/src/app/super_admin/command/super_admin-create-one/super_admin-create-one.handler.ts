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
    private readonly super_adminRepository: SuperAdminMongooseRepository
  ) {}

  async execute({ dto }: SuperAdminCreateOneCommand): Promise<void> {
    const { displayName, email, organization, password } = dto;
    const super_admin = this.eventPublisher.mergeObjectContext(
      new SuperAdminDomain({
        _id: new ObjectId().toHexString(),
        displayName: displayName,
        email: email,
        organization: organization,
        password: password,
      })
    );

    await this.super_adminRepository.create(super_admin);

    super_admin.apply(new SuperAdminCreatedOneEvent(super_admin._id));
    super_admin.commit();
  }
}
