import { IQuery } from '@nestjs/cqrs';
import { OrganizationLoginDto } from './login.dto';

export class OrganizationLoginQuery implements IQuery {
  constructor(public readonly dto: OrganizationLoginDto) {}
}
