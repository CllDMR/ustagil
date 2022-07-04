import { ICommand } from '@nestjs/cqrs';
import { BaseDeleteOneCommandDto } from './delete-one.dto';

export class BaseDeleteOneCommand implements ICommand {
  constructor(public readonly dto: BaseDeleteOneCommandDto) {}
}
