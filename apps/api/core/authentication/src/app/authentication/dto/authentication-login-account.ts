import { IsMongoId, IsString } from 'class-validator';

export class AuthenticationLoginAccountDto {
  @IsMongoId()
  _id: string;

  @IsString()
  email: string;

  @IsString()
  displayName: string;
}
