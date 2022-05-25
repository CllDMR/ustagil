import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SuperAdminReadedOneByEmailEvent } from './super_admin-readed-one-by-email.event';

@EventsHandler(SuperAdminReadedOneByEmailEvent)
export class SuperAdminReadedOneByEmailHandler
  implements IEventHandler<SuperAdminReadedOneByEmailEvent>
{
  async handle({
    super_adminId,
  }: SuperAdminReadedOneByEmailEvent): Promise<void> {
    console.log('Readed one super_admin by email with id:', super_adminId);
  }
}
