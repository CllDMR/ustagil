import { AggregateRoot } from '@nestjs/cqrs';
import { Expose, Transform } from 'class-transformer';

export class UserDomain extends AggregateRoot {
  #_id: string;
  #displayName: string;
  #email: string;
  #organization: string;
  #password: string;

  constructor({
    _id,
    displayName,
    email,
    organization,
    password,
  }: Partial<UserDomain>) {
    super();
    this.#_id = _id;
    this.#displayName = displayName;
    this.#email = email;
    this.#organization = organization;
    this.#password = password;
  }

  @Transform(({ obj, value }) => {
    obj._id = value;
    return value;
  })
  @Expose()
  public get _id() {
    return this.#_id;
  }
  public set _id(val) {
    this.#_id = val;
  }

  @Transform(({ obj, value }) => {
    obj.displayName = value;
    return value;
  })
  @Expose()
  public get displayName() {
    return this.#displayName;
  }
  public set displayName(val) {
    this.#displayName = val;
  }

  @Transform(({ obj, value }) => {
    obj.email = value;
    return value;
  })
  @Expose()
  public get email() {
    return this.#email;
  }
  public set email(val) {
    this.#email = val;
  }

  @Transform(({ obj, value }) => {
    obj.organization = value;
    return value;
  })
  @Expose()
  public get organization() {
    return this.#organization;
  }
  public set organization(val) {
    this.#organization = val;
  }

  @Transform(({ obj, value }) => {
    obj.password = value;
    return value;
  })
  @Expose()
  public get password() {
    return this.#password;
  }
  public set password(val) {
    this.#password = val;
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
