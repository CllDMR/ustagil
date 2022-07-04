import { IQuery } from '@nestjs/cqrs';
import { UserLoginDto } from './login.dto';

export class UserLoginQuery implements IQuery {
  constructor(public readonly dto: UserLoginDto) {}
}
