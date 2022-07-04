import { IQuery } from '@nestjs/cqrs';
import { SuperAdminFindOneDto } from './read-one.dto';

export class SuperAdminReadOneQuery implements IQuery {
  constructor(public readonly dto: SuperAdminFindOneDto) {}
}
