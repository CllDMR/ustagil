import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { OrganizationCreatedOneEvent } from './created-one.event';

@EventsHandler(OrganizationCreatedOneEvent)
export class OrganizationCreatedOneHandler
  implements IEventHandler<OrganizationCreatedOneEvent>
{
  async handle({ id }: OrganizationCreatedOneEvent): Promise<void> {
    console.log('Created organization with id:', id);
  }
}
