import { IQuery } from '@nestjs/cqrs';
import { AuthenticationOrganizationValidateDto } from './validate.dto';

export class AuthenticationOrganizationValidateQuery implements IQuery {
  constructor(public readonly dto: AuthenticationOrganizationValidateDto) {}
}
