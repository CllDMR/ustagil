import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserLoginnedEvent } from './logined.event';

@EventsHandler(UserLoginnedEvent)
export class UserLoginnedHandler implements IEventHandler<UserLoginnedEvent> {
  async handle({ displayName, email }: UserLoginnedEvent): Promise<void> {
    console.log('Loginned user with id:', displayName, email);
  }
}
