import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AccountCreatedOneEvent } from './account-created-one.event';

@EventsHandler(AccountCreatedOneEvent)
export class AccountCreatedOneHandler
  implements IEventHandler<AccountCreatedOneEvent>
{
  async handle({ id }: AccountCreatedOneEvent): Promise<void> {
    console.log('Created account with id:', id);
  }
}
