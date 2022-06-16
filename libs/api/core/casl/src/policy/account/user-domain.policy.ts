import { UserDomain } from '@ustagil/api/core/account/typing';
import { Action, PolicyRule } from '../../types';

export class UserDomainCreatePolicyRule implements PolicyRule {
  action = Action.Create;
  subject = UserDomain;
}

export class UserDomainReadPolicyRule implements PolicyRule {
  action = Action.Read;
  subject = UserDomain;
}

export class UserDomainUpdatePolicyRule implements PolicyRule {
  action = Action.Update;
  subject = UserDomain;
}

export class UserDomainDeletePolicyRule implements PolicyRule {
  action = Action.Delete;
  subject = UserDomain;
}
