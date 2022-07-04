import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { BaseLoginnedEvent } from './logined.event';

@EventsHandler(BaseLoginnedEvent)
export class BaseLoginnedHandler implements IEventHandler<BaseLoginnedEvent> {
  async handle({ displayName, email }: BaseLoginnedEvent): Promise<void> {
    console.log('Loginned base with id:', displayName, email);
  }
}
