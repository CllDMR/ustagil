import { IsMongoId } from 'class-validator';

export class OrganizationFindOneQueryDto {
  @IsMongoId()
  id: string;
}
