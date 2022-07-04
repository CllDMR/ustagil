import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { OrganizationReadedOneByEmailEvent } from './readed-one-by-email.event';

@EventsHandler(OrganizationReadedOneByEmailEvent)
export class OrganizationReadedOneByEmailHandler
  implements IEventHandler<OrganizationReadedOneByEmailEvent>
{
  async handle({ id }: OrganizationReadedOneByEmailEvent): Promise<void> {
    console.log('Readed one organization by email with id:', id);
  }
}
