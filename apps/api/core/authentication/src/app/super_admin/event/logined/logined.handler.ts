import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AuthenticationSuperAdminLoginnedEvent } from './logined.event';

@EventsHandler(AuthenticationSuperAdminLoginnedEvent)
export class AuthenticationSuperAdminLoginnedHandler
  implements IEventHandler<AuthenticationSuperAdminLoginnedEvent>
{
  async handle({
    displayName,
    email,
  }: AuthenticationSuperAdminLoginnedEvent): Promise<void> {
    console.log('Loginned account super_admin with id:', displayName, email);
  }
}
