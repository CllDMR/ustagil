import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AccountUserDeletedOneEvent } from './deleted-one.event';

@EventsHandler(AccountUserDeletedOneEvent)
export class AccountUserDeletedOneHandler
  implements IEventHandler<AccountUserDeletedOneEvent>
{
  async handle({ id }: AccountUserDeletedOneEvent): Promise<void> {
    console.log('Deleted account user with id:', id);
  }
}
