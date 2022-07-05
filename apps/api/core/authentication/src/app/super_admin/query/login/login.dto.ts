import { Role } from '@ustagil/api/core/common/typing';
import { IsEnum, IsMongoId, IsString } from 'class-validator';

export class AuthenticationSuperAdminLoginDto {
  @IsMongoId()
  id: string;

  @IsString()
  email: string;

  @IsString()
  displayName: string;

  @IsEnum(Role)
  role: Role;
}
