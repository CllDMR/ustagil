import { IsMongoId } from 'class-validator';

export class UserFindOneQueryDto {
  @IsMongoId()
  id: string;
}
