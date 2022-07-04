import { ICommand } from '@nestjs/cqrs';
import { OrganizationRegisterDto } from './register.dto';

export class OrganizationRegisterCommand implements ICommand {
  constructor(public readonly dto: OrganizationRegisterDto) {}
}
