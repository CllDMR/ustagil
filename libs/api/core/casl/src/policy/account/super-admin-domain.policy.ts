import { AccountSuperAdminDomain } from '@ustagil/api/core/account/typing';
import { Action, PolicyRule } from '../../types';

export class AccountSuperAdminDomainCreatePolicyRule implements PolicyRule {
  action = Action.Create;
  subject = AccountSuperAdminDomain;
}

export class AccountSuperAdminDomainReadPolicyRule implements PolicyRule {
  action = Action.Read;
  subject = AccountSuperAdminDomain;
}

export class AccountSuperAdminDomainUpdatePolicyRule implements PolicyRule {
  action = Action.Update;
  subject = AccountSuperAdminDomain;
}

export class AccountSuperAdminDomainDeletePolicyRule implements PolicyRule {
  action = Action.Delete;
  subject = AccountSuperAdminDomain;
}
