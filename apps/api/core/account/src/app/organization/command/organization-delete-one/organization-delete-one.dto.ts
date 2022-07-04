import { IsMongoId } from 'class-validator';

export class OrganizationDeleteOneDto {
  @IsMongoId()
  id: string;
}
