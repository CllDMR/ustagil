import { PartialType } from '@nestjs/mapped-types';
import { IsMongoId } from 'class-validator';
import { AccountOrganizationCreateOneCommandDto } from '../create-one/create-one.dto';

export class AccountOrganizationUpdateOneCommandDto extends PartialType(
  AccountOrganizationCreateOneCommandDto
) {
  @IsMongoId()
  id: string;
}
