import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SuperAdminReadedOneEvent } from './super_admin-readed-one.event';

@EventsHandler(SuperAdminReadedOneEvent)
export class SuperAdminReadedOneHandler
  implements IEventHandler<SuperAdminReadedOneEvent>
{
  async handle({ id }: SuperAdminReadedOneEvent): Promise<void> {
    console.log('Readed one super_admin with id:', id);
  }
}
