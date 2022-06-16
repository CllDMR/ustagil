import { Role } from '@ustagil/api/core/common/typing';
import { IsEnum, IsMongoId, IsString } from 'class-validator';

export class AuthenticationLoginAccountDto {
  @IsMongoId()
  id: string;

  @IsString()
  email: string;

  @IsString()
  displayName: string;

  @IsString()
  organization: string;

  @IsEnum(Role)
  role: Role;
}
