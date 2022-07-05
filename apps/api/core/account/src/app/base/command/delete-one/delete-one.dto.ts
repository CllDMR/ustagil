import { IsMongoId } from 'class-validator';

export class AccountBaseDeleteOneCommandDto {
  @IsMongoId()
  id: string;
}
