import { IsMongoId } from 'class-validator';

export class AccountOrganizationReadOneQueryDto {
  @IsMongoId()
  id: string;
}
