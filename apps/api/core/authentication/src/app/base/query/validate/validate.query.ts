import { IQuery } from '@nestjs/cqrs';
import { BaseValidateDto } from './validate.dto';

export class BaseValidateQuery implements IQuery {
  constructor(public readonly dto: BaseValidateDto) {}
}
