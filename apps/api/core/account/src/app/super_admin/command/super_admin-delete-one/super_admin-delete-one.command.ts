import { ICommand } from '@nestjs/cqrs';
import { SuperAdminDeleteOneDto } from './super_admin-delete-one.dto';

export class SuperAdminDeleteOneCommand implements ICommand {
  constructor(public readonly dto: SuperAdminDeleteOneDto) {}
}
