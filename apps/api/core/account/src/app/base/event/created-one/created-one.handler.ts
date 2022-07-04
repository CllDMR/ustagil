import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { BaseCreatedOneEvent } from './created-one.event';

@EventsHandler(BaseCreatedOneEvent)
export class BaseCreatedOneHandler
  implements IEventHandler<BaseCreatedOneEvent>
{
  async handle({ id }: BaseCreatedOneEvent): Promise<void> {
    console.log('Created base with id:', id);
  }
}
