import { IQuery } from '@nestjs/cqrs';
import { BaseFindOneDto } from './read-one.dto';

export class BaseReadOneQuery implements IQuery {
  constructor(public readonly dto: BaseFindOneDto) {}
}
