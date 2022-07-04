import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SuperAdminValidatedEvent } from './validated.event';

@EventsHandler(SuperAdminValidatedEvent)
export class SuperAdminValidatedHandler
  implements IEventHandler<SuperAdminValidatedEvent>
{
  async handle({ accountId }: SuperAdminValidatedEvent): Promise<void> {
    console.log('Validated super_admin with id:', accountId);
  }
}
