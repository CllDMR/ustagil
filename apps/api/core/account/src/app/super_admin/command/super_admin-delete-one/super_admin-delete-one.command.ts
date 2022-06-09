import { SuperAdminDeleteOneDto } from '../../dto/super_admin-delete-one.dto';

export class SuperAdminDeleteOneCommand {
  constructor(public readonly dto: SuperAdminDeleteOneDto) {}
}
