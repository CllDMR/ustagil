import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { SuperAdminMongooseRepository } from '@ustagil/api/core/account/data-access';
import { SuperAdminDomain } from '@ustagil/api/core/account/typing';
import { ObjectId } from 'mongodb';
import { SuperAdminDeletedOneEvent } from '../../event';
import { SuperAdminDeleteOneCommand } from './super_admin-delete-one.command';

@CommandHandler(SuperAdminDeleteOneCommand)
export class SuperAdminDeleteOneHandler
  implements ICommandHandler<SuperAdminDeleteOneCommand>
{
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly superAdminRepository: SuperAdminMongooseRepository
  ) {}

  async execute({
    dto,
  }: SuperAdminDeleteOneCommand): Promise<SuperAdminDomain> {
    const { id } = dto;

    const SuperAdminMergedDomain =
      this.eventPublisher.mergeClassContext(SuperAdminDomain);

    const deletedSuperAdminDomain =
      await this.superAdminRepository.findOneAndRemove({
        _id: new ObjectId(id),
      });

    const superAdminMergedDomain = new SuperAdminMergedDomain(
      deletedSuperAdminDomain
    );

    superAdminMergedDomain.apply(
      new SuperAdminDeletedOneEvent(superAdminMergedDomain.id)
    );
    superAdminMergedDomain.commit();

    return superAdminMergedDomain;
  }
}
