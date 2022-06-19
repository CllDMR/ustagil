import { IQuery } from '@nestjs/cqrs';
import { SuperAdminFindOneByEmailDto } from '../../dto';

export class SuperAdminReadOneByEmailQuery implements IQuery {
  constructor(public readonly dto: SuperAdminFindOneByEmailDto) {}
}
