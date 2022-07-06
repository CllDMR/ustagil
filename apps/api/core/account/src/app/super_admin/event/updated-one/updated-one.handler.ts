import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AccountSuperAdminUpdatedOneEvent } from './updated-one.event';

@EventsHandler(AccountSuperAdminUpdatedOneEvent)
export class AccountSuperAdminUpdatedOneHandler
  implements IEventHandler<AccountSuperAdminUpdatedOneEvent>
{
  async handle({ id }: AccountSuperAdminUpdatedOneEvent): Promise<void> {
    console.log('Updated account super_admin with id:', id);
  }
}
