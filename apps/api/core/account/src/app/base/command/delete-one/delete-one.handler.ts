import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { AccountBaseMongooseRepository } from '@ustagil/api/core/account/data-access';
import { AccountBaseDomain } from '@ustagil/api/core/account/typing';
import { ObjectId } from 'mongodb';
import { AccountBaseDeletedOneEvent } from '../../event';
import { AccountBaseDeleteOneCommand } from './delete-one.command';

@CommandHandler(AccountBaseDeleteOneCommand)
export class AccountBaseDeleteOneHandler
  implements ICommandHandler<AccountBaseDeleteOneCommand>
{
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly accountBaseRepository: AccountBaseMongooseRepository
  ) {}

  async execute({
    dto,
  }: AccountBaseDeleteOneCommand): Promise<AccountBaseDomain> {
    const { id } = dto;

    const AccountBaseMergedDomain =
      this.eventPublisher.mergeClassContext(AccountBaseDomain);

    const deletedAccountBaseDomain =
      await this.accountBaseRepository.readOneAndRemove({
        _id: new ObjectId(id),
      });

    const accountBaseDomain = new AccountBaseMergedDomain(
      deletedAccountBaseDomain
    );

    accountBaseDomain.apply(
      new AccountBaseDeletedOneEvent(accountBaseDomain.id)
    );
    accountBaseDomain.commit();

    return accountBaseDomain;
  }
}
