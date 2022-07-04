import { IQuery } from '@nestjs/cqrs';
import { SuperAdminFindOneByEmailQueryDto } from './read-one-by-email.dto';

export class SuperAdminReadOneByEmailQuery implements IQuery {
  constructor(public readonly dto: SuperAdminFindOneByEmailQueryDto) {}
}
