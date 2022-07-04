import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserValidatedEvent } from './validated.event';

@EventsHandler(UserValidatedEvent)
export class UserValidatedHandler implements IEventHandler<UserValidatedEvent> {
  async handle({ accountId }: UserValidatedEvent): Promise<void> {
    console.log('Validated user with id:', accountId);
  }
}
