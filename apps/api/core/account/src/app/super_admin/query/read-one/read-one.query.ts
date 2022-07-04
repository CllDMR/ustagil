import { IQuery } from '@nestjs/cqrs';
import { SuperAdminFindOneQueryDto } from './read-one.dto';

export class SuperAdminReadOneQuery implements IQuery {
  constructor(public readonly dto: SuperAdminFindOneQueryDto) {}
}
