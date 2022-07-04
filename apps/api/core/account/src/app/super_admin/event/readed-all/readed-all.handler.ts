import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SuperAdminReadedAllEvent } from './readed-all.event';

@EventsHandler(SuperAdminReadedAllEvent)
export class SuperAdminReadedAllHandler
  implements IEventHandler<SuperAdminReadedAllEvent>
{
  async handle(_: SuperAdminReadedAllEvent): Promise<void> {
    console.log('Readed all super_admins');
  }
}
