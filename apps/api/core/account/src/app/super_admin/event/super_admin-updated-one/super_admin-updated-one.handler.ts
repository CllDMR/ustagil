import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SuperAdminUpdatedOneEvent } from './super_admin-updated-one.event';

@EventsHandler(SuperAdminUpdatedOneEvent)
export class SuperAdminUpdatedOneHandler
  implements IEventHandler<SuperAdminUpdatedOneEvent>
{
  async handle({ super_adminId }: SuperAdminUpdatedOneEvent): Promise<void> {
    console.log('Updated super_admin with id:', super_adminId);
  }
}
