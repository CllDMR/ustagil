import { AggregateRoot } from '@nestjs/cqrs';
import { Role } from '@ustagil/api/core/common/typing';

export class SuperAdminDomain extends AggregateRoot {
  id: string;
  role: Role;
  displayName: string;
  email: string;
  organization: string;
  password: string;

  constructor({
    id,
    role,
    displayName,
    email,
    organization,
    password,
  }: Partial<SuperAdminDomain>) {
    super();
    this.id = id;
    this.role = role;
    this.displayName = displayName;
    this.email = email;
    this.organization = organization;
    this.password = password;
  }

  toString() {
    return JSON.stringify({
      id: this.id,
      role: this.role,
      displayName: this.displayName,
      email: this.email,
      organization: this.organization,
      password: this.password,
    });
  }
}
