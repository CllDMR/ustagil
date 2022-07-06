import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AccountBaseCreatedOneEvent } from './created-one.event';

@EventsHandler(AccountBaseCreatedOneEvent)
export class AccountBaseCreatedOneHandler
  implements IEventHandler<AccountBaseCreatedOneEvent>
{
  async handle({ id }: AccountBaseCreatedOneEvent): Promise<void> {
    console.log('Created account base with id:', id);
  }
}
