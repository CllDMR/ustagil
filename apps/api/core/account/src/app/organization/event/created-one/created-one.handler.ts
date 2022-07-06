import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AccountOrganizationCreatedOneEvent } from './created-one.event';

@EventsHandler(AccountOrganizationCreatedOneEvent)
export class AccountOrganizationCreatedOneHandler
  implements IEventHandler<AccountOrganizationCreatedOneEvent>
{
  async handle({ id }: AccountOrganizationCreatedOneEvent): Promise<void> {
    console.log('Created account organization with id:', id);
  }
}
