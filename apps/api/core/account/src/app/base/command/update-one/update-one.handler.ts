import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { AccountBaseMongooseRepository } from '@ustagil/api/core/account/data-access';
import { AccountBaseDomain } from '@ustagil/api/core/account/typing';
import { ObjectId } from 'mongodb';
import { AccountBaseUpdatedOneEvent } from '../../event';
import { AccountBaseUpdateOneCommand } from './update-one.command';

@CommandHandler(AccountBaseUpdateOneCommand)
export class AccountBaseUpdateOneHandler
  implements ICommandHandler<AccountBaseUpdateOneCommand>
{
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly accountBaseRepository: AccountBaseMongooseRepository
  ) {}

  async execute({
    dto,
  }: AccountBaseUpdateOneCommand): Promise<AccountBaseDomain> {
    const { id, displayName, email } = dto;

    const AccountBaseMergedDomain =
      this.eventPublisher.mergeClassContext(AccountBaseDomain);

    const updatedAccountBaseDomain =
      await this.accountBaseRepository.readOneAndUpdate(
        {
          _id: new ObjectId(id),
        },
        new AccountBaseDomain({
          displayName,
          email,
        })
      );

    const accountBaseDomain = new AccountBaseMergedDomain(
      updatedAccountBaseDomain
    );

    accountBaseDomain.apply(
      new AccountBaseUpdatedOneEvent(accountBaseDomain.id)
    );
    accountBaseDomain.commit();

    return updatedAccountBaseDomain;
  }
}
