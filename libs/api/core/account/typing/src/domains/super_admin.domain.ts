import { AccountKind } from '@ustagil/api/core/common/typing';
import { AccountBaseDomain } from './base.domain';

export class AccountSuperAdminDomain extends AccountBaseDomain {
  constructor({
    id,
    role,
    displayName,
    email,
    password,
  }: Partial<AccountSuperAdminDomain>) {
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
