import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AccountOrganizationUpdatedOneEvent } from './updated-one.event';

@EventsHandler(AccountOrganizationUpdatedOneEvent)
export class AccountOrganizationUpdatedOneHandler
  implements IEventHandler<AccountOrganizationUpdatedOneEvent>
{
  async handle({ id }: AccountOrganizationUpdatedOneEvent): Promise<void> {
    console.log('Updated account organization with id:', id);
  }
}
