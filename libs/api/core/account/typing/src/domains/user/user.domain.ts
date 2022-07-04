import { AccountKind } from '@ustagil/api/core/common/typing';
import { BaseDomain } from '../base/base.domain';

export class UserDomain extends BaseDomain {
  constructor({ id, role, displayName, email, password }: Partial<UserDomain>) {
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
