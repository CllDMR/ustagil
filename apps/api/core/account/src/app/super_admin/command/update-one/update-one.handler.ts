import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { SuperAdminMongooseRepository } from '@ustagil/api/core/account/data-access';
import { SuperAdminDomain } from '@ustagil/api/core/account/typing';
import { ObjectId } from 'mongodb';
import { SuperAdminUpdatedOneEvent } from '../../event';
import { SuperAdminUpdateOneCommand } from './update-one.command';

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
    const { id, displayName, email } = dto;

    const SuperAdminMergedDomain =
      this.eventPublisher.mergeClassContext(SuperAdminDomain);

    const updatedSuperAdminDomain =
      await this.superAdminRepository.findOneAndUpdate(
        {
          _id: new ObjectId(id),
        },
        new SuperAdminDomain({
          displayName,
          email,
        })
      );

    const superAdminMergedDomain = new SuperAdminMergedDomain(
      updatedSuperAdminDomain
    );

    superAdminMergedDomain.apply(
      new SuperAdminUpdatedOneEvent(superAdminMergedDomain.id)
    );
    superAdminMergedDomain.commit();

    return updatedSuperAdminDomain;
  }
}
