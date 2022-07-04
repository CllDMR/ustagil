import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserCreatedOneEvent } from './created-one.event';

@EventsHandler(UserCreatedOneEvent)
export class UserCreatedOneHandler
  implements IEventHandler<UserCreatedOneEvent>
{
  async handle({ id }: UserCreatedOneEvent): Promise<void> {
    console.log('Created user with id:', id);
  }
}
