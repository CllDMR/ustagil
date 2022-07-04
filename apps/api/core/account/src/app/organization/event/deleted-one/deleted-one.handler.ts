import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { OrganizationDeletedOneEvent } from './deleted-one.event';

@EventsHandler(OrganizationDeletedOneEvent)
export class OrganizationDeletedOneHandler
  implements IEventHandler<OrganizationDeletedOneEvent>
{
  async handle({ id }: OrganizationDeletedOneEvent): Promise<void> {
    console.log('Deleted organization with id:', id);
  }
}
