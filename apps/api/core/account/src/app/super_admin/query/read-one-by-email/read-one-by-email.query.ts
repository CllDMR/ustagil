import { IQuery } from '@nestjs/cqrs';
import { SuperAdminFindOneByEmailDto } from './read-one-by-email.dto';

export class SuperAdminReadOneByEmailQuery implements IQuery {
  constructor(public readonly dto: SuperAdminFindOneByEmailDto) {}
}
