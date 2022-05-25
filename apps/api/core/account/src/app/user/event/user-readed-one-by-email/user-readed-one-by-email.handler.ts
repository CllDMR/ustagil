import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserReadedOneByEmailEvent } from './user-readed-one-by-email.event';

@EventsHandler(UserReadedOneByEmailEvent)
export class UserReadedOneByEmailHandler
  implements IEventHandler<UserReadedOneByEmailEvent>
{
  async handle({ userId }: UserReadedOneByEmailEvent): Promise<void> {
    console.log('Readed one user by email with id:', userId);
  }
}
