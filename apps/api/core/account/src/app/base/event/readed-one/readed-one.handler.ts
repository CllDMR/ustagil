import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AccountBaseReadedOneEvent } from './readed-one.event';

@EventsHandler(AccountBaseReadedOneEvent)
export class AccountBaseReadedOneHandler
  implements IEventHandler<AccountBaseReadedOneEvent>
{
  async handle({ id }: AccountBaseReadedOneEvent): Promise<void> {
    console.log('Readed one account base with id:', id);
  }
}
