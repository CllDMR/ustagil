import { IQuery } from '@nestjs/cqrs';
import { AuthenticationUserLoginDto } from './login.dto';

export class AuthenticationUserLoginQuery implements IQuery {
  constructor(public readonly dto: AuthenticationUserLoginDto) {}
}
