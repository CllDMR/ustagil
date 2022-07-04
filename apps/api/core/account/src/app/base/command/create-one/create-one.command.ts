import { ICommand } from '@nestjs/cqrs';
import { BaseCreateOneDto } from './create-one.dto';

export class BaseCreateOneCommand implements ICommand {
  constructor(public readonly dto: BaseCreateOneDto) {}
}
