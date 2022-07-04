import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { OrganizationUpdatedOneEvent } from './updated-one.event';

@EventsHandler(OrganizationUpdatedOneEvent)
export class OrganizationUpdatedOneHandler
  implements IEventHandler<OrganizationUpdatedOneEvent>
{
  async handle({ id }: OrganizationUpdatedOneEvent): Promise<void> {
    console.log('Updated organization with id:', id);
  }
}