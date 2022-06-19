import { IQuery } from '@nestjs/cqrs';
import { AuthenticationLoginAccountDto } from '../../dto';

export class AuthenticationLoginAccountQuery implements IQuery {
  constructor(public readonly dto: AuthenticationLoginAccountDto) {}
}
