import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AccountBaseReadedAllEvent } from './readed-all.event';

@EventsHandler(AccountBaseReadedAllEvent)
export class AccountBaseReadedAllHandler
  implements IEventHandler<AccountBaseReadedAllEvent>
{
  async handle(_: AccountBaseReadedAllEvent): Promise<void> {
    console.log('Readed all account bases');
  }
}
