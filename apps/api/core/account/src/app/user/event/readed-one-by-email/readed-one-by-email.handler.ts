import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AccountUserReadedOneByEmailEvent } from './readed-one-by-email.event';

@EventsHandler(AccountUserReadedOneByEmailEvent)
export class AccountUserReadedOneByEmailHandler
  implements IEventHandler<AccountUserReadedOneByEmailEvent>
{
  async handle({ id }: AccountUserReadedOneByEmailEvent): Promise<void> {
    console.log('Readed one account user by email with id:', id);
  }
}
