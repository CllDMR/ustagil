import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AccountReadedOneEvent } from './account-readed-one.event';

@EventsHandler(AccountReadedOneEvent)
export class AccountReadedOneHandler
  implements IEventHandler<AccountReadedOneEvent>
{
  async handle({ id }: AccountReadedOneEvent): Promise<void> {
    console.log('Readed one account with id:', id);
  }
}
