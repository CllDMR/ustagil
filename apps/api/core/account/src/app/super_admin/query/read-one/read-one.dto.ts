import { IsMongoId } from 'class-validator';

export class AccountSuperAdminReadOneQueryDto {
  @IsMongoId()
  id: string;
}
