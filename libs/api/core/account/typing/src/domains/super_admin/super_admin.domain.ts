import { AccountKind } from '@ustagil/api/core/common/typing';
import { BaseDomain } from '../base/base.domain';

export class SuperAdminDomain extends BaseDomain {
  constructor({
    id,
    role,
    displayName,
    email,
    password,
  }: Partial<SuperAdminDomain>) {
    super({
      id,
      kind: AccountKind.ACCOUNT_KIND_SUPER_ADMIN,
      role,
      displayName,
      email,
      password,
    });
  }

  toString() {
    return super.toString();
  }
}
