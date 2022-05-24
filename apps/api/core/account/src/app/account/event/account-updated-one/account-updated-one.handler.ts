import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AccountUpdatedOneEvent } from './account-updated-one.event';

@EventsHandler(AccountUpdatedOneEvent)
export class AccountUpdatedOneHandler
  implements IEventHandler<AccountUpdatedOneEvent>
{
  async handle({ accountId }: AccountUpdatedOneEvent): Promise<void> {
    console.log('Updated account with id:', accountId);
  }
}