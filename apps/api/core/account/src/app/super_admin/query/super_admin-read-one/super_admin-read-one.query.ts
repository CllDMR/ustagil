import { IQuery } from '@nestjs/cqrs';
import { SuperAdminFindOneDto } from './super_admin-find-one.dto';

export class SuperAdminReadOneQuery implements IQuery {
  constructor(public readonly dto: SuperAdminFindOneDto) {}
}
