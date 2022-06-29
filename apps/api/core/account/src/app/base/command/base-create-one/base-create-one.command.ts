import { ICommand } from '@nestjs/cqrs';
import { BaseCreateOneDto } from '../../dto/base-create-one.dto';

export class BaseCreateOneCommand implements ICommand {
  constructor(public readonly dto: BaseCreateOneDto) {}
}
