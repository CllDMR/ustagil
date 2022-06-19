import { Role } from '@ustagil/api/core/common/typing';

export class SuperAdminFindOneResponseBodyDto {
  id: string;
  role: Role;
  displayName: string;
  email: string;
  organization: string;
}
