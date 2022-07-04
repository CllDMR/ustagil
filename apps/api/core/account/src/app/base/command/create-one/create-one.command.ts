import { ICommand } from '@nestjs/cqrs';
import { BaseCreateOneCommandDto } from './create-one.dto';

export class BaseCreateOneCommand implements ICommand {
  constructor(public readonly dto: BaseCreateOneCommandDto) {}
}
