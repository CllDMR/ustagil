import { IQuery } from '@nestjs/cqrs';
import { AuthenticationSuperAdminLoginDto } from './login.dto';

export class AuthenticationSuperAdminLoginQuery implements IQuery {
  constructor(public readonly dto: AuthenticationSuperAdminLoginDto) {}
}
