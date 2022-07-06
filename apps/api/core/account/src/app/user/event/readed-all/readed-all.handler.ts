import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AccountUserReadedAllEvent } from './readed-all.event';

@EventsHandler(AccountUserReadedAllEvent)
export class AccountUserReadedAllHandler
  implements IEventHandler<AccountUserReadedAllEvent>
{
  async handle(_: AccountUserReadedAllEvent): Promise<void> {
    console.log('Readed all account users');
  }
}
