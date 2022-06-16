import { AccountDomain } from '@ustagil/api/core/account/typing';
import { Action, PolicyRule } from '../../types';

export class AccountDomainCreatePolicyRule implements PolicyRule {
  action = Action.Create;
  subject = AccountDomain;
}

export class AccountDomainReadPolicyRule implements PolicyRule {
  action = Action.Read;
  subject = AccountDomain;
}

export class AccountDomainUpdatePolicyRule implements PolicyRule {
  action = Action.Update;
  subject = AccountDomain;
}

export class AccountDomainDeletePolicyRule implements PolicyRule {
  action = Action.Delete;
  subject = AccountDomain;
}
