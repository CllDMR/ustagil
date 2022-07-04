import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { OrganizationReadedAllEvent } from './readed-all.event';

@EventsHandler(OrganizationReadedAllEvent)
export class OrganizationReadedAllHandler
  implements IEventHandler<OrganizationReadedAllEvent>
{
  async handle(_: OrganizationReadedAllEvent): Promise<void> {
    console.log('Readed all organizations');
  }
}
