import { IQuery } from '@nestjs/cqrs';
import { AuthenticationBaseValidateDto } from './validate.dto';

export class AuthenticationBaseValidateQuery implements IQuery {
  constructor(public readonly dto: AuthenticationBaseValidateDto) {}
}
