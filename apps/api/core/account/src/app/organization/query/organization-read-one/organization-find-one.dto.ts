import { IsMongoId } from 'class-validator';

export class OrganizationFindOneDto {
  @IsMongoId()
  id: string;
}
