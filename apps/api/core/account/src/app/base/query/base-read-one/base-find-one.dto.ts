import { IsMongoId } from 'class-validator';

export class BaseFindOneDto {
  @IsMongoId()
  id: string;
}
