import { IQuery } from '@nestjs/cqrs';
import { BaseFindAllDto } from './read-all.dto';

export class BaseReadAllQuery implements IQuery {
  constructor(public readonly dto: BaseFindAllDto) {}
}
