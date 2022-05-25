import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SuperAdminDeletedOneEvent } from './super_admin-deleted-one.event';

@EventsHandler(SuperAdminDeletedOneEvent)
export class SuperAdminDeletedOneHandler
  implements IEventHandler<SuperAdminDeletedOneEvent>
{
  async handle({ super_adminId }: SuperAdminDeletedOneEvent): Promise<void> {
    console.log('Deleted super_admin with id:', super_adminId);
  }
}
