import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AccountOrganizationReadedAllEvent } from './readed-all.event';

@EventsHandler(AccountOrganizationReadedAllEvent)
export class AccountOrganizationReadedAllHandler
  implements IEventHandler<AccountOrganizationReadedAllEvent>
{
  async handle(_: AccountOrganizationReadedAllEvent): Promise<void> {
    console.log('Readed all account organizations');
  }
}
