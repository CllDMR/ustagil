import { IsMongoId } from 'class-validator';

export class UserFindOneDto {
  @IsMongoId()
  id: string;
}
