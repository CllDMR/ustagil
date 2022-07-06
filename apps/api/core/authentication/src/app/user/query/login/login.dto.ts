import { Role } from '@ustagil/api/core/common/typing';
import { IsEnum, IsMongoId } from 'class-validator';

export class AuthenticationUserLoginDto {
  @IsMongoId()
  id: string;

  @IsEnum(Role)
  role: Role;
}
