import { Role } from '@ustagil/api/core/common/typing';

export class SuperAdminUpdateOneResponseBodyDto {
  id: string;
  role: Role;
  displayName: string;
  email: string;
  organization: string;
}
