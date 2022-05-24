import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AccountReadedOneByEmailEvent } from './account-readed-one-by-email.event';

@EventsHandler(AccountReadedOneByEmailEvent)
export class AccountReadedOneByEmailHandler
  implements IEventHandler<AccountReadedOneByEmailEvent>
{
  async handle({ id }: AccountReadedOneByEmailEvent): Promise<void> {
    console.log('Readed one account by email with id:', id);
  }
}
