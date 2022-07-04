import { AggregateRoot } from '@nestjs/cqrs';
import { Expose, Transform } from 'class-transformer';

export class AuthenticationDomain extends AggregateRoot {
  #displayName: string;
  #email: string;
  #organization: string;
  #password: string;

  constructor(
    displayName?: string,
    email?: string,
    organization?: string,
    password?: string
  ) {
    super();
    this.#displayName = displayName;
    this.#email = email;
    this.#organization = organization;
    this.#password = password;
  }

  @Transform(({ obj, value }) => (obj.displayName = value))
  @Expose({ name: 'displayName' })
  get displayName() {
    return this.#displayName;
  }
  set displayName(val) {
    this.#displayName = val;
  }

  @Transform(({ obj, value }) => (obj.email = value))
  @Expose({ name: 'email' })
  get email() {
    return this.#email;
  }
  set email(val) {
    this.#email = val;
  }

  @Transform(({ obj, value }) => (obj.organization = value))
  @Expose({ name: 'organization' })
  get organization() {
    return this.#organization;
  }
  set organization(val) {
    this.#organization = val;
  }

  @Transform(({ obj, value }) => (obj.password = value))
  @Expose({ name: 'password' })
  get password() {
    return this.#password;
  }
  set password(val) {
    this.#password = val;
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
