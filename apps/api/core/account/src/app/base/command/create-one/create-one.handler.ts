import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { AccountBaseMongooseRepository } from '@ustagil/api/core/account/data-access';
import { AccountBaseDomain } from '@ustagil/api/core/account/typing';
import { AccountKind, Role } from '@ustagil/api/core/common/typing';
import { ObjectId } from 'mongodb';
import { AccountBaseCreatedOneEvent } from '../../event';
import { AccountBaseCreateOneCommand } from './create-one.command';

@CommandHandler(AccountBaseCreateOneCommand)
export class AccountBaseCreateOneHandler
  implements ICommandHandler<AccountBaseCreateOneCommand>
{
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly accountBaseRepository: AccountBaseMongooseRepository
  ) {}

  async execute({
    dto,
  }: AccountBaseCreateOneCommand): Promise<AccountBaseDomain> {
    const { displayName, email, password } = dto;

    const AccountBaseMergedDomain =
      this.eventPublisher.mergeClassContext(AccountBaseDomain);

    const createdAccountBaseDomain = await this.accountBaseRepository.create(
      new AccountBaseDomain({
        id: new ObjectId().toHexString(),
        kind: AccountKind.ACCOUNT_KIND_BASE,
        role: Role.ROLE_BASE,
        displayName: displayName,
        email: email,
        password: password,
      })
    );

    const accountBaseDomain = new AccountBaseMergedDomain(
      createdAccountBaseDomain
    );

    accountBaseDomain.apply(
      new AccountBaseCreatedOneEvent(accountBaseDomain.id)
    );
    accountBaseDomain.commit();

    return accountBaseDomain;
  }
}
