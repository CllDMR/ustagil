import { IsMongoId } from 'class-validator';

export class AccountDeleteOneDto {
  @IsMongoId()
  id: string;
}
