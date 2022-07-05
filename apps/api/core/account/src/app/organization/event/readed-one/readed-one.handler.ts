import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AccountOrganizationReadedOneEvent } from './readed-one.event';

@EventsHandler(AccountOrganizationReadedOneEvent)
export class AccountOrganizationReadedOneHandler
  implements IEventHandler<AccountOrganizationReadedOneEvent>
{
  async handle({ id }: AccountOrganizationReadedOneEvent): Promise<void> {
    console.log('Readed one account organization with id:', id);
  }
}
