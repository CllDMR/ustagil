import { IQuery } from '@nestjs/cqrs';
import { BaseFindOneByEmailDto } from '../../dto';

export class BaseReadOneByEmailQuery implements IQuery {
  constructor(public readonly dto: BaseFindOneByEmailDto) {}
}
