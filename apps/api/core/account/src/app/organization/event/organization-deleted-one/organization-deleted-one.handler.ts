import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { OrganizationDeletedOneEvent } from './organization-deleted-one.event';

@EventsHandler(OrganizationDeletedOneEvent)
export class OrganizationDeletedOneHandler
  implements IEventHandler<OrganizationDeletedOneEvent>
{
  async handle({ organizationId }: OrganizationDeletedOneEvent): Promise<void> {
    console.log('Deleted organization with id:', organizationId);
  }
}
