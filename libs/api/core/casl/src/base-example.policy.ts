import { UserDomain } from '@ustagil/api/core/account/typing';
import { Action } from './action.enum';
import { AppAbility } from './casl-ability.factory';
import { IPolicyHandler } from './policy-handler';

export class CreateUserDomainPolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Create, UserDomain);
  }
}

export class ReadUserDomainPolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Read, UserDomain);
  }
}

export class UpdateUserDomainPolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Update, UserDomain);
  }
}

export class DeleteUserDomainPolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Delete, UserDomain);
  }
}
