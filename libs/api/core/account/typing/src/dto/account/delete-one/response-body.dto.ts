import { Role } from '@ustagil/api/core/common/typing';

export class AccountDeleteOneResponseBodyDto {
  id: string;
  role: Role;
  displayName: string;
  email: string;
  organization: string;
}
