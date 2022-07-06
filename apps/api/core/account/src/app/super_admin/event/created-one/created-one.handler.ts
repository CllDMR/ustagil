import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AccountSuperAdminCreatedOneEvent } from './created-one.event';

@EventsHandler(AccountSuperAdminCreatedOneEvent)
export class AccountSuperAdminCreatedOneHandler
  implements IEventHandler<AccountSuperAdminCreatedOneEvent>
{
  async handle({ id }: AccountSuperAdminCreatedOneEvent): Promise<void> {
    console.log('Created account super_admin with id:', id);
  }
}
