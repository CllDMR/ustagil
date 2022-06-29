import { IsEmail } from 'class-validator';

export class BaseFindOneByEmailMSMessage {
  @IsEmail()
  email: string;

  constructor(email: string) {
    this.email = email;
  }

  toString() {
    return JSON.stringify({
      email: this.email,
    });
  }
}
