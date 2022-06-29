import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { BaseReadedOneEvent } from './base-readed-one.event';

@EventsHandler(BaseReadedOneEvent)
export class BaseReadedOneHandler implements IEventHandler<BaseReadedOneEvent> {
  async handle({ id }: BaseReadedOneEvent): Promise<void> {
    console.log('Readed one base with id:', id);
  }
}
