import { SuperAdminUpdateOneDto } from '../../dto/super_admin-update-one.dto';

export class SuperAdminUpdateOneCommand {
  constructor(public readonly dto: SuperAdminUpdateOneDto) {}
}
