import { IsEmail } from 'class-validator';

export class BaseFindOneByEmailDto {
  @IsEmail()
  email: string;
}
