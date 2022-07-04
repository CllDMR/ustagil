import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SuperAdminReadedOneByEmailEvent } from './readed-one-by-email.event';

@EventsHandler(SuperAdminReadedOneByEmailEvent)
export class SuperAdminReadedOneByEmailHandler
  implements IEventHandler<SuperAdminReadedOneByEmailEvent>
{
  async handle({ id }: SuperAdminReadedOneByEmailEvent): Promise<void> {
    console.log('Readed one super_admin by email with id:', id);
  }
}
