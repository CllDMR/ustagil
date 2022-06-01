import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AccountDeletedOneEvent } from './account-deleted-one.event';

@EventsHandler(AccountDeletedOneEvent)
export class AccountDeletedOneHandler
  implements IEventHandler<AccountDeletedOneEvent>
{
  async handle({ id }: AccountDeletedOneEvent): Promise<void> {
    console.log('Deleted account with id:', id);
  }
}
