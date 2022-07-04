import { IQuery } from '@nestjs/cqrs';
import { SuperAdminLoginDto } from './login.dto';

export class SuperAdminLoginQuery implements IQuery {
  constructor(public readonly dto: SuperAdminLoginDto) {}
}
