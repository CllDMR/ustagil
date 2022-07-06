import { AuthenticationBaseDomain } from './base.domain';

export class AuthenticationUserDomain extends AuthenticationBaseDomain {
  constructor({
    id,
    displayName,
    email,
    organization,
    password,
    role,
  }: Partial<AuthenticationUserDomain>) {
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
