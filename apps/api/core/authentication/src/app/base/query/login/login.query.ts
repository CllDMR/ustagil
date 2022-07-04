import { IQuery } from '@nestjs/cqrs';
import { BaseLoginDto } from './login.dto';

export class BaseLoginQuery implements IQuery {
  constructor(public readonly dto: BaseLoginDto) {}
}
