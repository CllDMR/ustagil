import { ICommand } from '@nestjs/cqrs';
import { SuperAdminUpdateOneDto } from '../../dto/super_admin-update-one.dto';

export class SuperAdminUpdateOneCommand implements ICommand {
  constructor(public readonly dto: SuperAdminUpdateOneDto) {}
}
