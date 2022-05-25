import { SuperAdminFindOneDto } from '../../dto/super_admin-find-one.dto';

export class SuperAdminReadOneQuery {
  constructor(public readonly dto: SuperAdminFindOneDto) {}
}
