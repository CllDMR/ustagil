import { ICommand } from '@nestjs/cqrs';
import { SuperAdminCreateOneCommandDto } from './create-one.dto';

export class SuperAdminCreateOneCommand implements ICommand {
  constructor(public readonly dto: SuperAdminCreateOneCommandDto) {}
}
