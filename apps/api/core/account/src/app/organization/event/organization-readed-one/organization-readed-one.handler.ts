import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { OrganizationReadedOneEvent } from './organization-readed-one.event';

@EventsHandler(OrganizationReadedOneEvent)
export class OrganizationReadedOneHandler
  implements IEventHandler<OrganizationReadedOneEvent>
{
  async handle({ id }: OrganizationReadedOneEvent): Promise<void> {
    console.log('Readed one organization with id:', id);
  }
}
