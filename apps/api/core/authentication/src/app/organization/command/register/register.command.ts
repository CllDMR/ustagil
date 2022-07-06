import { ICommand } from '@nestjs/cqrs';
import { AuthenticationOrganizationRegisterDto } from './register.dto';

export class AuthenticationOrganizationRegisterCommand implements ICommand {
  constructor(public readonly dto: AuthenticationOrganizationRegisterDto) {}
}
