import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserReadedAllEvent } from './readed-all.event';

@EventsHandler(UserReadedAllEvent)
export class UserReadedAllHandler implements IEventHandler<UserReadedAllEvent> {
  async handle(_: UserReadedAllEvent): Promise<void> {
    console.log('Readed all users');
  }
}
