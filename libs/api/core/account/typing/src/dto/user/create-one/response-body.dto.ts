import { Role } from '@ustagil/api/core/common/typing';

export class UserCreateOneResponseBodyDto {
  id: string;
  role: Role;
  displayName: string;
  email: string;
  organization: string;
}
