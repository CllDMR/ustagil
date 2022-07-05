import { IQuery } from '@nestjs/cqrs';
import { AuthenticationSuperAdminValidateDto } from './validate.dto';

export class AuthenticationSuperAdminValidateQuery implements IQuery {
  constructor(public readonly dto: AuthenticationSuperAdminValidateDto) {}
}
