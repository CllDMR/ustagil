import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { OrganizationRegisteredEvent } from './registered.event';

@EventsHandler(OrganizationRegisteredEvent)
export class OrganizationRegisteredHandler
  implements IEventHandler<OrganizationRegisteredEvent>
{
  async handle({ accountId }: OrganizationRegisteredEvent): Promise<void> {
    console.log('Registered organization with id:', accountId);
  }
}
