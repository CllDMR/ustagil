import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AccountBaseUpdatedOneEvent } from './updated-one.event';

@EventsHandler(AccountBaseUpdatedOneEvent)
export class AccountBaseUpdatedOneHandler
  implements IEventHandler<AccountBaseUpdatedOneEvent>
{
  async handle({ id }: AccountBaseUpdatedOneEvent): Promise<void> {
    console.log('Updated account base with id:', id);
  }
}
