import { IsString } from 'class-validator';

export class AccountCreateOneMSEvent {
  @IsString()
  displayName: string;

  @IsString()
  email: string;

  @IsString()
  organization: string;

  @IsString()
  password: string;

  constructor(
    displayName: string,
    email: string,
    organization: string,
    password: string
  ) {
    this.displayName = displayName;
    this.email = email;
    this.organization = organization;
    this.password = password;
  }

  toString() {
    return JSON.stringify({
      displayName: this.displayName,
      email: this.email,
      organization: this.organization,
      password: this.password,
    });
  }
}
