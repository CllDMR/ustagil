import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserRegisteredEvent } from './registered.event';

@EventsHandler(UserRegisteredEvent)
export class UserRegisteredHandler
  implements IEventHandler<UserRegisteredEvent>
{
  async handle({ accountId }: UserRegisteredEvent): Promise<void> {
    console.log('Registered user with id:', accountId);
  }
}
