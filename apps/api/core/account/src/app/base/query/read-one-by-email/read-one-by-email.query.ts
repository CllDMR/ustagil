import { IQuery } from '@nestjs/cqrs';
import { BaseFindOneByEmailQueryDto } from './read-one-by-email.dto';

export class BaseReadOneByEmailQuery implements IQuery {
  constructor(public readonly dto: BaseFindOneByEmailQueryDto) {}
}
