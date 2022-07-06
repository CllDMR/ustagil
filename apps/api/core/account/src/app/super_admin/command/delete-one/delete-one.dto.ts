import { IsMongoId } from 'class-validator';

export class AccountSuperAdminDeleteOneCommandDto {
  @IsMongoId()
  id: string;
}
