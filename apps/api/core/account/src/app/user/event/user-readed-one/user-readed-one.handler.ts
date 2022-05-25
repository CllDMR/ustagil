import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserReadedOneEvent } from './user-readed-one.event';

@EventsHandler(UserReadedOneEvent)
export class UserReadedOneHandler implements IEventHandler<UserReadedOneEvent> {
  async handle({ userId }: UserReadedOneEvent): Promise<void> {
    console.log('Readed one user with id:', userId);
  }
}
