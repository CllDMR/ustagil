import { SuperAdminFindAllDto } from '../../dto/super_admin-find-all.dto';

export class SuperAdminReadAllQuery {
  constructor(public readonly dto: SuperAdminFindAllDto) {}
}
