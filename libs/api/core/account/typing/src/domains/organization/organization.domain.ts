import { AccountKind } from '@ustagil/api/core/common/typing';
import { BaseDomain } from '../base/base.domain';

export class OrganizationDomain extends BaseDomain {
  organization: string;

  constructor({
    id,
    role,
    displayName,
    email,
    organization,
    password,
  }: Partial<OrganizationDomain>) {
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
