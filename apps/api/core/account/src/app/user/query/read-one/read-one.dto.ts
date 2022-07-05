import { IsMongoId } from 'class-validator';

export class AccountUserReadOneQueryDto {
  @IsMongoId()
  id: string;
}
