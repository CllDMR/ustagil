import { AggregateRoot } from '@nestjs/cqrs';

export class AccountDomain extends AggregateRoot {
  _id: string;
  displayName: string;
  email: string;
  organization: string;
  password: string;

  constructor({
    _id,
    displayName,
    email,
    organization,
    password,
  }: Partial<AccountDomain>) {
    super();
    this._id = _id;
    this.displayName = displayName;
    this.email = email;
    this.organization = organization;
    this.password = password;
  }

  toString() {
    return JSON.stringify({
      _id: this._id,
      displayName: this.displayName,
      email: this.email,
      organization: this.organization,
      password: this.password,
    });
  }
}
