import { AccountKind } from '@ustagil/api/core/common/typing';
import { AccountBaseDomain } from './base.domain';

export class AccountUserDomain extends AccountBaseDomain {
  constructor({
    id,
    role,
    displayName,
    email,
    password,
  }: Partial<AccountUserDomain>) {
    super({
      id,
      kind: AccountKind.ACCOUNT_KIND_USER,
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
