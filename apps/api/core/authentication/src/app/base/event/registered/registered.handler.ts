import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { BaseRegisteredEvent } from './registered.event';

@EventsHandler(BaseRegisteredEvent)
export class BaseRegisteredHandler
  implements IEventHandler<BaseRegisteredEvent>
{
  async handle({ accountId }: BaseRegisteredEvent): Promise<void> {
    console.log('Registered base with id:', accountId);
  }
}
