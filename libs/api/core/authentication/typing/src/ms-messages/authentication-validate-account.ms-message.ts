import { IsString } from 'class-validator';

export class AuthenticationValidateAccountMSMessage {
  @IsString()
  email: string;

  @IsString()
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

  toString() {
    return JSON.stringify({
      email: this.email,
      password: this.password,
    });
  }
}
