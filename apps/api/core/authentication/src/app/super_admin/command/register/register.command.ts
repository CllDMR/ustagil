import { ICommand } from '@nestjs/cqrs';
import { SuperAdminRegisterDto } from './register.dto';

export class SuperAdminRegisterCommand implements ICommand {
  constructor(public readonly dto: SuperAdminRegisterDto) {}
}
