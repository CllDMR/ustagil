import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AuthenticationSuperAdminRegisteredEvent } from './registered.event';

@EventsHandler(AuthenticationSuperAdminRegisteredEvent)
export class AuthenticationSuperAdminRegisteredHandler
  implements IEventHandler<AuthenticationSuperAdminRegisteredEvent>
{
  async handle({
    accountId,
  }: AuthenticationSuperAdminRegisteredEvent): Promise<void> {
    console.log('Registered account super_admin with id:', accountId);
  }
}
