import { IQuery } from '@nestjs/cqrs';
import { BaseFindAllDto } from './base-find-all.dto';

export class BaseReadAllQuery implements IQuery {
  constructor(public readonly dto: BaseFindAllDto) {}
}
