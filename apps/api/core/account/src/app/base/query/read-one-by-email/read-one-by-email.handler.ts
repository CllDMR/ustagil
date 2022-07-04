import { EventPublisher, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { BaseMongooseRepository } from '@ustagil/api/core/account/data-access';
import { BaseDomain } from '@ustagil/api/core/account/typing';
import { BaseReadedOneByEmailEvent } from '../../event';
import { BaseReadOneByEmailQuery } from './read-one-by-email.query';

@QueryHandler(BaseReadOneByEmailQuery)
export class BaseReadOneByEmailHandler
  implements IQueryHandler<BaseReadOneByEmailQuery>
{
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly baseRepository: BaseMongooseRepository
  ) {}

  async execute({ dto }: BaseReadOneByEmailQuery) {
    const { email } = dto;

    const BaseMergedDomain = this.eventPublisher.mergeClassContext(BaseDomain);

    const foundBaseDomain = await this.baseRepository.findOne(
      { email },
      '+password'
    );

    const baseMergedDomain = new BaseMergedDomain(foundBaseDomain);

    baseMergedDomain.apply(new BaseReadedOneByEmailEvent(baseMergedDomain.id));
    baseMergedDomain.commit();

    return baseMergedDomain;
  }
}
