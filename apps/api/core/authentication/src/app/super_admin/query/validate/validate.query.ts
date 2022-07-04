import { IQuery } from '@nestjs/cqrs';
import { SuperAdminValidateDto } from './validate.dto';

export class SuperAdminValidateQuery implements IQuery {
  constructor(public readonly dto: SuperAdminValidateDto) {}
}
