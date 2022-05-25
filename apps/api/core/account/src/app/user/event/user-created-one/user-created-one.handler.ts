import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserCreatedOneEvent } from './user-created-one.event';

@EventsHandler(UserCreatedOneEvent)
export class UserCreatedOneHandler
  implements IEventHandler<UserCreatedOneEvent>
{
  async handle({ userId }: UserCreatedOneEvent): Promise<void> {
    console.log('Created user with id:', userId);
  }
}
