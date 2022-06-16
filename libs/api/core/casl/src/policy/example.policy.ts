import { UserDomain } from '@ustagil/api/core/account/typing';
import { Action, PolicyRule } from '../types';

export class EXAMPLE_UserDomainCreatePolicyRule implements PolicyRule {
  action = Action.Create;
  subject = UserDomain;
}

export class EXAMPLE_UserDomainReadPolicyRule implements PolicyRule {
  action = Action.Read;
  subject = UserDomain;
}

export class EXAMPLE_UserDomainUpdatePolicyRule implements PolicyRule {
  action = Action.Update;
  subject = UserDomain;
}

export class EXAMPLE_UserDomainDeletePolicyRule implements PolicyRule {
  action = Action.Delete;
  subject = UserDomain;
}
