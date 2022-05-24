import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AccountReadedAllEvent } from './account-readed-all.event';

@EventsHandler(AccountReadedAllEvent)
export class AccountReadedAllHandler
  implements IEventHandler<AccountReadedAllEvent>
{
  async handle(_: AccountReadedAllEvent): Promise<void> {
    console.log('Readed all accounts');
  }
}
