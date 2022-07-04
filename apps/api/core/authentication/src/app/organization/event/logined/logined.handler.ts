import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { OrganizationLoginnedEvent } from './logined.event';

@EventsHandler(OrganizationLoginnedEvent)
export class OrganizationLoginnedHandler
  implements IEventHandler<OrganizationLoginnedEvent>
{
  async handle({
    displayName,
    email,
  }: OrganizationLoginnedEvent): Promise<void> {
    console.log('Loginned organization with id:', displayName, email);
  }
}
