import { ICommand } from '@nestjs/cqrs';
import { SuperAdminCreateOneDto } from '../../dto/super_admin-create-one.dto';

export class SuperAdminCreateOneCommand implements ICommand {
  constructor(public readonly dto: SuperAdminCreateOneDto) {}
}
