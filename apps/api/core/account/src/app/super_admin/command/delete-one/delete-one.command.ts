import { ICommand } from '@nestjs/cqrs';
import { SuperAdminDeleteOneCommandDto } from './delete-one.dto';

export class SuperAdminDeleteOneCommand implements ICommand {
  constructor(public readonly dto: SuperAdminDeleteOneCommandDto) {}
}
