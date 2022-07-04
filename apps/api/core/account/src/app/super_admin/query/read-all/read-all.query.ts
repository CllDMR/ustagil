import { IQuery } from '@nestjs/cqrs';
import { SuperAdminFindAllDto } from './read-all.dto';

export class SuperAdminReadAllQuery implements IQuery {
  constructor(public readonly dto: SuperAdminFindAllDto) {}
}
