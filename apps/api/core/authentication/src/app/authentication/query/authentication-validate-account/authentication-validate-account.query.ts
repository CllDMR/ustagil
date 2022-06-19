import { IQuery } from '@nestjs/cqrs';
import { AuthenticationValidateAccountDto } from '../../dto';

export class AuthenticationValidateAccountQuery implements IQuery {
  constructor(public readonly dto: AuthenticationValidateAccountDto) {}
}
