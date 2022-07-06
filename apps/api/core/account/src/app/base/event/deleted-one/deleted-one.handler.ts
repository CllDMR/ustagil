import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AccountBaseDeletedOneEvent } from './deleted-one.event';

@EventsHandler(AccountBaseDeletedOneEvent)
export class AccountBaseDeletedOneHandler
  implements IEventHandler<AccountBaseDeletedOneEvent>
{
  async handle({ id }: AccountBaseDeletedOneEvent): Promise<void> {
    console.log('Deleted account base with id:', id);
  }
}
