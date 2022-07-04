import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserReadedOneEvent } from './readed-one.event';

@EventsHandler(UserReadedOneEvent)
export class UserReadedOneHandler implements IEventHandler<UserReadedOneEvent> {
  async handle({ id }: UserReadedOneEvent): Promise<void> {
    console.log('Readed one user with id:', id);
  }
}
