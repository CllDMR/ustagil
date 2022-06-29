import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { BaseMongooseRepository } from '@ustagil/api/core/account/data-access';
import { BaseDomain } from '@ustagil/api/core/account/typing';
import { ObjectId } from 'mongodb';
import { BaseDeletedOneEvent } from '../../event';
import { BaseDeleteOneCommand } from './base-delete-one.command';

@CommandHandler(BaseDeleteOneCommand)
export class BaseDeleteOneHandler
  implements ICommandHandler<BaseDeleteOneCommand>
{
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly baseRepository: BaseMongooseRepository
  ) {}

  async execute({ dto }: BaseDeleteOneCommand): Promise<BaseDomain> {
    const { id } = dto;

    const BaseMergedDomain = this.eventPublisher.mergeClassContext(BaseDomain);

    const deletedBaseDomain = await this.baseRepository.findOneAndRemove({
      _id: new ObjectId(id),
    });

    const baseMergedDomain = new BaseMergedDomain(deletedBaseDomain);

    baseMergedDomain.apply(new BaseDeletedOneEvent(baseMergedDomain.id));
    baseMergedDomain.commit();

    return baseMergedDomain;
  }
}
