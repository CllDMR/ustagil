import { IQuery } from '@nestjs/cqrs';
import { AuthenticationBaseLoginDto } from './login.dto';

export class AuthenticationBaseLoginQuery implements IQuery {
  constructor(public readonly dto: AuthenticationBaseLoginDto) {}
}
