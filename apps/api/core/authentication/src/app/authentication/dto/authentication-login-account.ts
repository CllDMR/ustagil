import { IsMongoId, IsString } from 'class-validator';

export class AuthenticationLoginAccountDto {
  @IsMongoId()
  id: string;

  @IsString()
  email: string;

  @IsString()
  displayName: string;
}
