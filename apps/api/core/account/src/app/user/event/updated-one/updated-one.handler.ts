import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AccountUserUpdatedOneEvent } from './updated-one.event';

@EventsHandler(AccountUserUpdatedOneEvent)
export class AccountUserUpdatedOneHandler
  implements IEventHandler<AccountUserUpdatedOneEvent>
{
  async handle({ id }: AccountUserUpdatedOneEvent): Promise<void> {
    console.log('Updated account user with id:', id);
  }
}
