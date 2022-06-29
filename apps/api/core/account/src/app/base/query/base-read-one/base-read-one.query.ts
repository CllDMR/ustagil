import { IQuery } from '@nestjs/cqrs';
import { BaseFindOneDto } from '../../dto/base-find-one.dto';

export class BaseReadOneQuery implements IQuery {
  constructor(public readonly dto: BaseFindOneDto) {}
}
