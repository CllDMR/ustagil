import { IsMongoId } from 'class-validator';

export class BaseDeleteOneDto {
  @IsMongoId()
  id: string;
}
