import { AccountKind, Role } from '@ustagil/api/core/common/typing';

export class AccountBaseUpdateOneResponseBodyDto {
  id: string;
  kind: AccountKind;
  role: Role;
  displayName: string;
  email: string;
}
