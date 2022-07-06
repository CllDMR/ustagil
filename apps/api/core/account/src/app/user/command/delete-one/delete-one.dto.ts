import { IsMongoId } from 'class-validator';

export class AccountUserDeleteOneCommandDto {
  @IsMongoId()
  id: string;
}
