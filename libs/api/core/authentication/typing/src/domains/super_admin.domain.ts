import { AuthenticationBaseDomain } from './base.domain';

export class AuthenticationSuperAdminDomain extends AuthenticationBaseDomain {
  constructor({
    id,
    displayName,
    email,
    organization,
    password,
    role,
  }: Partial<AuthenticationSuperAdminDomain>) {
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
