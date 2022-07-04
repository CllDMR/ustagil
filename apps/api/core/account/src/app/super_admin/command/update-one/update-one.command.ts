import { ICommand } from '@nestjs/cqrs';
import { SuperAdminUpdateOneCommandDto } from './update-one.dto';

export class SuperAdminUpdateOneCommand implements ICommand {
  constructor(public readonly dto: SuperAdminUpdateOneCommandDto) {}
}
