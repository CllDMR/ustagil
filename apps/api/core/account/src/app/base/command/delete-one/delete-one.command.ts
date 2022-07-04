import { ICommand } from '@nestjs/cqrs';
import { BaseDeleteOneDto } from './delete-one.dto';

export class BaseDeleteOneCommand implements ICommand {
  constructor(public readonly dto: BaseDeleteOneDto) {}
}
