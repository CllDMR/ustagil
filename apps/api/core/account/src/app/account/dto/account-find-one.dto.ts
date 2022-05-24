import { IsMongoId } from 'class-validator';

export class AccountFindOneDto {
  @IsMongoId()
  id: string;
}
