import { IsEmail } from 'class-validator';

export class UserFindOneByEmailMSMessage {
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
