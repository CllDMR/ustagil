import { ICommand } from '@nestjs/cqrs';
import { AuthenticationSuperAdminRegisterDto } from './register.dto';

export class AuthenticationSuperAdminRegisterCommand implements ICommand {
  constructor(public readonly dto: AuthenticationSuperAdminRegisterDto) {}
}
