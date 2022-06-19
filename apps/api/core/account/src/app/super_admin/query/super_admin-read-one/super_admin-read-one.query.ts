import { IQuery } from '@nestjs/cqrs';
import { SuperAdminFindOneDto } from '../../dto/super_admin-find-one.dto';

export class SuperAdminReadOneQuery implements IQuery {
  constructor(public readonly dto: SuperAdminFindOneDto) {}
}
