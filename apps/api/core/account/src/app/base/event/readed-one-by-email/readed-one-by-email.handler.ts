import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AccountBaseReadedOneByEmailEvent } from './readed-one-by-email.event';

@EventsHandler(AccountBaseReadedOneByEmailEvent)
export class AccountBaseReadedOneByEmailHandler
  implements IEventHandler<AccountBaseReadedOneByEmailEvent>
{
  async handle({ id }: AccountBaseReadedOneByEmailEvent): Promise<void> {
    console.log('Readed one account base by email with id:', id);
  }
}
