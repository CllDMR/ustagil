import { IsMongoId } from 'class-validator';

export class UserDeleteOneDto {
  @IsMongoId()
  id: string;
}
