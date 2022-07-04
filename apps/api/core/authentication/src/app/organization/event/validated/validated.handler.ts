import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { OrganizationValidatedEvent } from './validated.event';

@EventsHandler(OrganizationValidatedEvent)
export class OrganizationValidatedHandler
  implements IEventHandler<OrganizationValidatedEvent>
{
  async handle({ accountId }: OrganizationValidatedEvent): Promise<void> {
    console.log('Validated organization with id:', accountId);
  }
}
