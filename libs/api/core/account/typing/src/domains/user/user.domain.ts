import { AggregateRoot } from '@nestjs/cqrs';

export class UserDomain extends AggregateRoot {
  id: string;
  displayName: string;
  email: string;
  organization: string;
  password: string;

  constructor({
    id,
    displayName,
    email,
    organization,
    password,
  }: Partial<UserDomain>) {
    super();
    this.id = id;
    this.displayName = displayName;
    this.email = email;
    this.organization = organization;
    this.password = password;
  }

  toString() {
    return JSON.stringify({
      id: this.id,
      displayName: this.displayName,
      email: this.email,
      organization: this.organization,
      password: this.password,
    });
  }
}
