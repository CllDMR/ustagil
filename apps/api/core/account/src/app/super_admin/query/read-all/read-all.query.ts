import { IQuery } from '@nestjs/cqrs';
import { SuperAdminFindAllQueryDto } from './read-all.dto';

export class SuperAdminReadAllQuery implements IQuery {
  constructor(public readonly dto: SuperAdminFindAllQueryDto) {}
}
