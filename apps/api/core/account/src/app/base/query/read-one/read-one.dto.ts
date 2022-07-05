import { IsMongoId } from 'class-validator';

export class AccountBaseReadOneQueryDto {
  @IsMongoId()
  id: string;
}
