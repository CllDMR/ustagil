import { IsEmail } from 'class-validator';

export class BaseFindOneByEmailQueryDto {
  @IsEmail()
  email: string;
}
