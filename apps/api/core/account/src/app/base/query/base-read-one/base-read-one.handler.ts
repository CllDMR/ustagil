import { EventPublisher, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { BaseMongooseRepository } from '@ustagil/api/core/account/data-access';
import { BaseDomain } from '@ustagil/api/core/account/typing';
import { BaseReadedOneEvent } from '../../event';
import { BaseReadOneQuery } from './base-read-one.query';

@QueryHandler(BaseReadOneQuery)
export class BaseReadOneHandler implements IQueryHandler<BaseReadOneQuery> {
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly baseRepository: BaseMongooseRepository
  ) {}

  async execute({ dto }: BaseReadOneQuery): Promise<BaseDomain> {
    const { id } = dto;

    const BaseMergedDomain = this.eventPublisher.mergeClassContext(BaseDomain);

    const foundBaseDomain = await this.baseRepository.findOneById(id);

    const baseMergedDomain = new BaseMergedDomain(foundBaseDomain);

    baseMergedDomain.apply(new BaseReadedOneEvent(baseMergedDomain.id));
    baseMergedDomain.commit();

    return baseMergedDomain;
  }
}
