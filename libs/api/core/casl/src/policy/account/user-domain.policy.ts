import { AccountUserDomain } from '@ustagil/api/core/account/typing';
import { Action, PolicyRule } from '../../types';

export class AccountUserDomainCreatePolicyRule implements PolicyRule {
  action = Action.Create;
  subject = AccountUserDomain;
}

export class AccountUserDomainReadPolicyRule implements PolicyRule {
  action = Action.Read;
  subject = AccountUserDomain;
}

export class AccountUserDomainUpdatePolicyRule implements PolicyRule {
  action = Action.Update;
  subject = AccountUserDomain;
}

export class AccountUserDomainDeletePolicyRule implements PolicyRule {
  action = Action.Delete;
  subject = AccountUserDomain;
}
