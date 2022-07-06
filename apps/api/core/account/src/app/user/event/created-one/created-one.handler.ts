import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AccountUserCreatedOneEvent } from './created-one.event';

@EventsHandler(AccountUserCreatedOneEvent)
export class AccountUserCreatedOneHandler
  implements IEventHandler<AccountUserCreatedOneEvent>
{
  async handle({ id }: AccountUserCreatedOneEvent): Promise<void> {
    console.log('Created account user with id:', id);
  }
}
