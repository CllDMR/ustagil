import { IQuery } from '@nestjs/cqrs';
import { SuperAdminFindAllDto } from '../../dto/super_admin-find-all.dto';

export class SuperAdminReadAllQuery implements IQuery {
  constructor(public readonly dto: SuperAdminFindAllDto) {}
}
