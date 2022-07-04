import { IQuery } from '@nestjs/cqrs';
import { UserValidateDto } from './validate.dto';

export class UserValidateQuery implements IQuery {
  constructor(public readonly dto: UserValidateDto) {}
}
