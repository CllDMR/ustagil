import { IsMongoId } from 'class-validator';

export class BaseFindOneQueryDto {
  @IsMongoId()
  id: string;
}
