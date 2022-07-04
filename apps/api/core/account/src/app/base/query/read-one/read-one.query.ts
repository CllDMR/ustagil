import { IQuery } from '@nestjs/cqrs';
import { BaseFindOneQueryDto } from './read-one.dto';

export class BaseReadOneQuery implements IQuery {
  constructor(public readonly dto: BaseFindOneQueryDto) {}
}
