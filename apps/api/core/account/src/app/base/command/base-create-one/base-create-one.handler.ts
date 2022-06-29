import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { BaseMongooseRepository } from '@ustagil/api/core/account/data-access';
import { BaseDomain } from '@ustagil/api/core/account/typing';
import { Role } from '@ustagil/api/core/common/typing';
import { ObjectId } from 'mongodb';
import { BaseCreatedOneEvent } from '../../event';
import { BaseCreateOneCommand } from './base-create-one.command';

@CommandHandler(BaseCreateOneCommand)
export class BaseCreateOneHandler
  implements ICommandHandler<BaseCreateOneCommand>
{
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly baseRepository: BaseMongooseRepository
  ) {}

  async execute({ dto }: BaseCreateOneCommand): Promise<BaseDomain> {
    const { displayName, email, organization, password } = dto;

    const BaseMergedDomain = this.eventPublisher.mergeClassContext(BaseDomain);

    const createdBaseDomain = await this.baseRepository.create(
      new BaseDomain({
        id: new ObjectId().toHexString(),
        role: Role.ROLE_BASE,
        displayName: displayName,
        email: email,
        organization: organization,
        password: password,
      })
    );

    const baseMergedDomain = new BaseMergedDomain(createdBaseDomain);

    baseMergedDomain.apply(new BaseCreatedOneEvent(baseMergedDomain.id));
    baseMergedDomain.commit();

    return baseMergedDomain;
  }
}
