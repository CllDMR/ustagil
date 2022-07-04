import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { BaseValidatedEvent } from './validated.event';

@EventsHandler(BaseValidatedEvent)
export class BaseValidatedHandler implements IEventHandler<BaseValidatedEvent> {
  async handle({ accountId }: BaseValidatedEvent): Promise<void> {
    console.log('Validated base with id:', accountId);
  }
}
