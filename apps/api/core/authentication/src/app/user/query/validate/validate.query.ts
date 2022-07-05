import { IQuery } from '@nestjs/cqrs';
import { AuthenticationUserValidateDto } from './validate.dto';

export class AuthenticationUserValidateQuery implements IQuery {
  constructor(public readonly dto: AuthenticationUserValidateDto) {}
}
