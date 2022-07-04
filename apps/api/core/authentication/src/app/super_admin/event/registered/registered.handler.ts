import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SuperAdminRegisteredEvent } from './registered.event';

@EventsHandler(SuperAdminRegisteredEvent)
export class SuperAdminRegisteredHandler
  implements IEventHandler<SuperAdminRegisteredEvent>
{
  async handle({ accountId }: SuperAdminRegisteredEvent): Promise<void> {
    console.log('Registered super_admin with id:', accountId);
  }
}
