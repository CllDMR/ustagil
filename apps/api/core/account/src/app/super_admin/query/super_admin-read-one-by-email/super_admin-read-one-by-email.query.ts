import { SuperAdminFindOneByEmailDto } from '../../dto';

export class SuperAdminReadOneByEmailQuery {
  constructor(public readonly dto: SuperAdminFindOneByEmailDto) {}
}
