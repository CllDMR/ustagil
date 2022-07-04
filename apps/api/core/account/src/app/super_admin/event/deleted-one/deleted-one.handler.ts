import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SuperAdminDeletedOneEvent } from './deleted-one.event';

@EventsHandler(SuperAdminDeletedOneEvent)
export class SuperAdminDeletedOneHandler
  implements IEventHandler<SuperAdminDeletedOneEvent>
{
  async handle({ id }: SuperAdminDeletedOneEvent): Promise<void> {
    console.log('Deleted super_admin with id:', id);
  }
}
