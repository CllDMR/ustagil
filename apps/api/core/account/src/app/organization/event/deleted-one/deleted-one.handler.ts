import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AccountOrganizationDeletedOneEvent } from './deleted-one.event';

@EventsHandler(AccountOrganizationDeletedOneEvent)
export class AccountOrganizationDeletedOneHandler
  implements IEventHandler<AccountOrganizationDeletedOneEvent>
{
  async handle({ id }: AccountOrganizationDeletedOneEvent): Promise<void> {
    console.log('Deleted account organization with id:', id);
  }
}
