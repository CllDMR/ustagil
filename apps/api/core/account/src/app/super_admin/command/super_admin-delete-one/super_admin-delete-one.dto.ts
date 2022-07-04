import { IsMongoId } from 'class-validator';

export class SuperAdminDeleteOneDto {
  @IsMongoId()
  id: string;
}
