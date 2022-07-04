import { ICommand } from '@nestjs/cqrs';
import { BaseUpdateOneDto } from './base-update-one.dto';

export class BaseUpdateOneCommand implements ICommand {
  constructor(public readonly dto: BaseUpdateOneDto) {}
}
