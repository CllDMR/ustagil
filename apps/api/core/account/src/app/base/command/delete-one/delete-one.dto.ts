import { IsMongoId } from 'class-validator';

export class BaseDeleteOneCommandDto {
  @IsMongoId()
  id: string;
}
