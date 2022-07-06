import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AccountSuperAdminDeletedOneEvent } from './deleted-one.event';

@EventsHandler(AccountSuperAdminDeletedOneEvent)
export class AccountSuperAdminDeletedOneHandler
  implements IEventHandler<AccountSuperAdminDeletedOneEvent>
{
  async handle({ id }: AccountSuperAdminDeletedOneEvent): Promise<void> {
    console.log('Deleted account super_admin with id:', id);
  }
}
