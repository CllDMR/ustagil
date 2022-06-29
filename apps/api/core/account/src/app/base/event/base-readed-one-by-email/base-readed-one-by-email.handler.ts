import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { BaseReadedOneByEmailEvent } from './base-readed-one-by-email.event';

@EventsHandler(BaseReadedOneByEmailEvent)
export class BaseReadedOneByEmailHandler
  implements IEventHandler<BaseReadedOneByEmailEvent>
{
  async handle({ id }: BaseReadedOneByEmailEvent): Promise<void> {
    console.log('Readed one base by email with id:', id);
  }
}
