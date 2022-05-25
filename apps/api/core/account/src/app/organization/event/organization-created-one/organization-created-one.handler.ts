import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { OrganizationCreatedOneEvent } from './organization-created-one.event';

@EventsHandler(OrganizationCreatedOneEvent)
export class OrganizationCreatedOneHandler
  implements IEventHandler<OrganizationCreatedOneEvent>
{
  async handle({ organizationId }: OrganizationCreatedOneEvent): Promise<void> {
    console.log('Created organization with id:', organizationId);
  }
}
