import { IsMongoId } from 'class-validator';

export class AccountOrganizationDeleteOneCommandDto {
  @IsMongoId()
  id: string;
}
