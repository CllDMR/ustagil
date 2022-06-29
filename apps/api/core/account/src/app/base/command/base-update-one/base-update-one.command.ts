import { ICommand } from '@nestjs/cqrs';
import { BaseUpdateOneDto } from '../../dto/base-update-one.dto';

export class BaseUpdateOneCommand implements ICommand {
  constructor(public readonly dto: BaseUpdateOneDto) {}
}
