import { IsMongoId } from 'class-validator';

export class OrganizationDeleteOneCommandDto {
  @IsMongoId()
  id: string;
}
