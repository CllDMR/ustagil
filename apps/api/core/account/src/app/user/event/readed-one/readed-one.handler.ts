import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AccountUserReadedOneEvent } from './readed-one.event';

@EventsHandler(AccountUserReadedOneEvent)
export class AccountUserReadedOneHandler
  implements IEventHandler<AccountUserReadedOneEvent>
{
  async handle({ id }: AccountUserReadedOneEvent): Promise<void> {
    console.log('Readed one account user with id:', id);
  }
}
