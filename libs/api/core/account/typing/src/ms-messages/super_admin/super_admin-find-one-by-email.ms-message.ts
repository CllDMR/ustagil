import { IsEmail } from 'class-validator';

export class SuperAdminFindOneByEmailMSMessage {
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
