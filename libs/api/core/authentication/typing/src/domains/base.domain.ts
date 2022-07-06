import { AggregateRoot } from '@nestjs/cqrs';
import { Role } from '@ustagil/api/core/common/typing';

export class AuthenticationBaseDomain extends AggregateRoot {
  id: string;
  displayName: string;
  email: string;
  organization: string;
  password: string;
  role: Role;

  constructor({
    id,
    displayName,
    email,
    organization,
    password,
    role,
  }: Partial<AuthenticationBaseDomain>) {
    super();
    this.id = id;
    this.role = role;
    this.displayName = displayName;
    this.email = email;
    this.organization = organization;
    this.password = password;
  }

  toString(extra?: object) {
    return JSON.stringify({
      id: this.id,
      role: this.role,
      displayName: this.displayName,
      email: this.email,
      organization: this.organization,
      password: this.password,
      ...extra,
    });
  }
}
