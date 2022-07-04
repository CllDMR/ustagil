import { IsMongoId } from 'class-validator';

export class SuperAdminFindOneDto {
  @IsMongoId()
  id: string;
}
