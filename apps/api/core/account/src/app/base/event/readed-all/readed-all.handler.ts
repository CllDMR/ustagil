import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { BaseReadedAllEvent } from './readed-all.event';

@EventsHandler(BaseReadedAllEvent)
export class BaseReadedAllHandler implements IEventHandler<BaseReadedAllEvent> {
  async handle(_: BaseReadedAllEvent): Promise<void> {
    console.log('Readed all bases');
  }
}
