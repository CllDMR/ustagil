import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SuperAdminLoginnedEvent } from './logined.event';

@EventsHandler(SuperAdminLoginnedEvent)
export class SuperAdminLoginnedHandler
  implements IEventHandler<SuperAdminLoginnedEvent>
{
  async handle({ displayName, email }: SuperAdminLoginnedEvent): Promise<void> {
    console.log('Loginned super_admin with id:', displayName, email);
  }
}
