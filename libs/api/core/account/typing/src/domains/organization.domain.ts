import { AccountKind } from '@ustagil/api/core/common/typing';
import { AccountBaseDomain } from './base.domain';

export class AccountOrganizationDomain extends AccountBaseDomain {
  organization: string;

  constructor({
    id,
    role,
    displayName,
    email,
    organization,
    password,
  }: Partial<AccountOrganizationDomain>) {
    super({
      id,
      kind: AccountKind.ACCOUNT_KIND_ORGANIZATION,
      role,
      displayName,
      email,
      password,
    });
    this.organization = organization;
  }

  toString() {
    return super.toString({ organization: this.organization });
  }
}
