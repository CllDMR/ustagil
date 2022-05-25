import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserUpdatedOneEvent } from './user-updated-one.event';

@EventsHandler(UserUpdatedOneEvent)
export class UserUpdatedOneHandler
  implements IEventHandler<UserUpdatedOneEvent>
{
  async handle({ userId }: UserUpdatedOneEvent): Promise<void> {
    console.log('Updated user with id:', userId);
  }
}
