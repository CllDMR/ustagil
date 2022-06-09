import { AccountDomain } from '@ustagil/api/core/account/typing';
import { Action } from '../action.enum';
import { AppAbility } from '../casl-ability.factory';
import { IPolicyHandler } from '../policy-handler';

export class CreateAccountDomainPolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Create, AccountDomain);
  }
}

export class ReadAccountDomainPolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Read, AccountDomain);
  }
}

export class UpdateAccountDomainPolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Update, AccountDomain);
  }
}

export class DeleteAccountDomainPolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Delete, AccountDomain);
  }
}
