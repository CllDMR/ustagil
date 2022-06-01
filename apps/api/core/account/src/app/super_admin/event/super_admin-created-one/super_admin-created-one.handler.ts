import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SuperAdminCreatedOneEvent } from './super_admin-created-one.event';

@EventsHandler(SuperAdminCreatedOneEvent)
export class SuperAdminCreatedOneHandler
  implements IEventHandler<SuperAdminCreatedOneEvent>
{
  async handle({ id }: SuperAdminCreatedOneEvent): Promise<void> {
    console.log('Created super_admin with id:', id);
  }
}
