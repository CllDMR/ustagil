import { Role } from '@ustagil/api/core/common/typing';
import { IsEnum, IsMongoId, IsString } from 'class-validator';

export class SuperAdminLoginDto {
  @IsMongoId()
  id: string;

  @IsString()
  email: string;

  @IsString()
  displayName: string;

  @IsEnum(Role)
  role: Role;
}