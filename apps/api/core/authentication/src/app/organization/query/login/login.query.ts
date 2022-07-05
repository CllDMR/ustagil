import { IQuery } from '@nestjs/cqrs';
import { AuthenticationOrganizationLoginDto } from './login.dto';

export class AuthenticationOrganizationLoginQuery implements IQuery {
  constructor(public readonly dto: AuthenticationOrganizationLoginDto) {}
}
