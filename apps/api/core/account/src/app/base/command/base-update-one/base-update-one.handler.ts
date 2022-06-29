import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { BaseMongooseRepository } from '@ustagil/api/core/account/data-access';
import { BaseDomain } from '@ustagil/api/core/account/typing';
import { ObjectId } from 'mongodb';
import { BaseUpdatedOneEvent } from '../../event';
import { BaseUpdateOneCommand } from './base-update-one.command';

@CommandHandler(BaseUpdateOneCommand)
export class BaseUpdateOneHandler
  implements ICommandHandler<BaseUpdateOneCommand>
{
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly baseRepository: BaseMongooseRepository
  ) {}

  async execute({ dto }: BaseUpdateOneCommand): Promise<BaseDomain> {
    const { id, displayName, email, organization } = dto;

    const BaseMergedDomain = this.eventPublisher.mergeClassContext(BaseDomain);

    const updatedBaseDomain = await this.baseRepository.findOneAndUpdate(
      {
        _id: new ObjectId(id),
      },
      new BaseDomain({
        displayName,
        email,
        organization,
      })
    );

    const baseMergedDomain = new BaseMergedDomain(updatedBaseDomain);

    baseMergedDomain.apply(new BaseUpdatedOneEvent(baseMergedDomain.id));
    baseMergedDomain.commit();

    return updatedBaseDomain;
  }
}
