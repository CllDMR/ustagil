import { ICommand } from '@nestjs/cqrs';
import { BaseDeleteOneDto } from './base-delete-one.dto';

export class BaseDeleteOneCommand implements ICommand {
  constructor(public readonly dto: BaseDeleteOneDto) {}
}
