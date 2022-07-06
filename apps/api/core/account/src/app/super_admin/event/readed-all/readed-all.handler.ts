import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AccountSuperAdminReadedAllEvent } from './readed-all.event';

@EventsHandler(AccountSuperAdminReadedAllEvent)
export class AccountSuperAdminReadedAllHandler
  implements IEventHandler<AccountSuperAdminReadedAllEvent>
{
  async handle(_: AccountSuperAdminReadedAllEvent): Promise<void> {
    console.log('Readed all account super_admins');
  }
}
