import { IsMongoId } from 'class-validator';

export class SuperAdminDeleteOneCommandDto {
  @IsMongoId()
  id: string;
}
