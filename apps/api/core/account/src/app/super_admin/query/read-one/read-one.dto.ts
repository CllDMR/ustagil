import { IsMongoId } from 'class-validator';

export class SuperAdminFindOneQueryDto {
  @IsMongoId()
  id: string;
}
