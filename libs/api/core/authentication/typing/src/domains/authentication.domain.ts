import { AggregateRoot } from '@nestjs/cqrs';

export class AuthenticationDomain extends AggregateRoot {
  displayName: string;
  email: string;
  organization: string;
  password: string;

  constructor({
    displayName,
    email,
    organization,
    password,
  }: Partial<AuthenticationDomain>) {
    super();
    this.displayName = displayName;
    this.email = email;
    this.organization = organization;
    this.password = password;
  }

  toString() {
    return JSON.stringify({
      displayName: this.displayName,
      email: this.email,
      organization: this.organization,
      password: this.password,
    });
  }
}
