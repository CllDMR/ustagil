import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { BaseUpdatedOneEvent } from './updated-one.event';

@EventsHandler(BaseUpdatedOneEvent)
export class BaseUpdatedOneHandler
  implements IEventHandler<BaseUpdatedOneEvent>
{
  async handle({ id }: BaseUpdatedOneEvent): Promise<void> {
    console.log('Updated base with id:', id);
  }
}
