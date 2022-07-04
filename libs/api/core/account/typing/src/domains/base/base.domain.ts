import { AggregateRoot } from '@nestjs/cqrs';
import { AccountKind, Role } from '@ustagil/api/core/common/typing';

export class BaseDomain extends AggregateRoot {
  id: string;
  kind: AccountKind;
  role: Role;
  displayName: string;
  email: string;
  password: string;

  constructor({
    id,
    kind = AccountKind.ACCOUNT_KIND_BASE,
    role,
    displayName,
    email,
    password,
  }: Partial<BaseDomain>) {
    super();
    this.id = id;
    this.kind = kind;
    this.role = role;
    this.displayName = displayName;
    this.email = email;
    this.password = password;
  }

  toString(extra?: object) {
    return JSON.stringify({
      id: this.id,
      kind: this.kind,
      role: this.role,
      displayName: this.displayName,
      email: this.email,
      password: this.password,
      ...extra,
    });
  }
}
