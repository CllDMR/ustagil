import { AuthenticationBaseDomain } from './base.domain';

export class AuthenticationOrganizationDomain extends AuthenticationBaseDomain {
  constructor({
    id,
    displayName,
    email,
    organization,
    password,
    role,
  }: Partial<AuthenticationOrganizationDomain>) {
    super({
      id,
      displayName,
      email,
      organization,
      password,
      role,
    });
  }

  toString() {
    return super.toString({});
  }
}
