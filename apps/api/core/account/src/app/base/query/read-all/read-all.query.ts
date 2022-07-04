import { IQuery } from '@nestjs/cqrs';
import { BaseFindAllQueryDto } from './read-all.dto';

export class BaseReadAllQuery implements IQuery {
  constructor(public readonly dto: BaseFindAllQueryDto) {}
}
