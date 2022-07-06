import { PartialType } from '@nestjs/mapped-types';
import { IsMongoId } from 'class-validator';
import { AccountBaseCreateOneCommandDto } from '../create-one/create-one.dto';

export class AccountBaseUpdateOneCommandDto extends PartialType(
  AccountBaseCreateOneCommandDto
) {
  @IsMongoId()
  id: string;
}
