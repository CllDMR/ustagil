import { IQuery } from '@nestjs/cqrs';
import { OrganizationValidateDto } from './validate.dto';

export class OrganizationValidateQuery implements IQuery {
  constructor(public readonly dto: OrganizationValidateDto) {}
}
