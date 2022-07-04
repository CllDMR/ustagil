import { IsMongoId } from 'class-validator';

export class UserDeleteOneCommandDto {
  @IsMongoId()
  id: string;
}
