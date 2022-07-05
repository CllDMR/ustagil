import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AccountSuperAdminReadedOneEvent } from './readed-one.event';

@EventsHandler(AccountSuperAdminReadedOneEvent)
export class AccountSuperAdminReadedOneHandler
  implements IEventHandler<AccountSuperAdminReadedOneEvent>
{
  async handle({ id }: AccountSuperAdminReadedOneEvent): Promise<void> {
    console.log('Readed one super_admin with id:', id);
  }
}
