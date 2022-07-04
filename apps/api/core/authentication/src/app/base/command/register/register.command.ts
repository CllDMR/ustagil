import { ICommand } from '@nestjs/cqrs';
import { BaseRegisterDto } from './register.dto';

export class BaseRegisterCommand implements ICommand {
  constructor(public readonly dto: BaseRegisterDto) {}
}
