import { ICommand } from '@nestjs/cqrs';
import { BaseUpdateOneCommandDto } from './update-one.dto';

export class BaseUpdateOneCommand implements ICommand {
  constructor(public readonly dto: BaseUpdateOneCommandDto) {}
}
