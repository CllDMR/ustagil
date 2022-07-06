import { Role } from '@ustagil/api/core/common/typing';
import { IsEnum, IsMongoId } from 'class-validator';

export class AuthenticationOrganizationLoginDto {
  @IsMongoId()
  id: string;

  @IsEnum(Role)
  role: Role;
}
