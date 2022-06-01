import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserDeletedOneEvent } from './user-deleted-one.event';

@EventsHandler(UserDeletedOneEvent)
export class UserDeletedOneHandler
  implements IEventHandler<UserDeletedOneEvent>
{
  async handle({ id }: UserDeletedOneEvent): Promise<void> {
    console.log('Deleted user with id:', id);
  }
}
