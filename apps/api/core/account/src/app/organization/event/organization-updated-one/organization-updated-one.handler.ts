import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { OrganizationUpdatedOneEvent } from './organization-updated-one.event';

@EventsHandler(OrganizationUpdatedOneEvent)
export class OrganizationUpdatedOneHandler
  implements IEventHandler<OrganizationUpdatedOneEvent>
{
  async handle({ organizationId }: OrganizationUpdatedOneEvent): Promise<void> {
    console.log('Updated organization with id:', organizationId);
  }
}
