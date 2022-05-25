import { SuperAdminCreateOneDto } from '../../dto/super_admin-create-one.dto';

export class SuperAdminCreateOneCommand {
  constructor(public readonly dto: SuperAdminCreateOneDto) {}
}
