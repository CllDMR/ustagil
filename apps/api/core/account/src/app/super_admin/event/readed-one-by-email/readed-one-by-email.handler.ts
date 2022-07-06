import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AccountSuperAdminReadedOneByEmailEvent } from './readed-one-by-email.event';

@EventsHandler(AccountSuperAdminReadedOneByEmailEvent)
export class AccountSuperAdminReadedOneByEmailHandler
  implements IEventHandler<AccountSuperAdminReadedOneByEmailEvent>
{
  async handle({ id }: AccountSuperAdminReadedOneByEmailEvent): Promise<void> {
    console.log('Readed one account super_admin by email with id:', id);
  }
}
