import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AccountOrganizationReadedOneByEmailEvent } from './readed-one-by-email.event';

@EventsHandler(AccountOrganizationReadedOneByEmailEvent)
export class AccountOrganizationReadedOneByEmailHandler
  implements IEventHandler<AccountOrganizationReadedOneByEmailEvent>
{
  async handle({
    id,
  }: AccountOrganizationReadedOneByEmailEvent): Promise<void> {
    console.log('Readed one account organization by email with id:', id);
  }
}
