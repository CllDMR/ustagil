import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { BaseDeletedOneEvent } from './deleted-one.event';

@EventsHandler(BaseDeletedOneEvent)
export class BaseDeletedOneHandler
  implements IEventHandler<BaseDeletedOneEvent>
{
  async handle({ id }: BaseDeletedOneEvent): Promise<void> {
    console.log('Deleted base with id:', id);
  }
}
