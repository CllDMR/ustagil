import { AccountDomain } from '@ustagil/api/core/account/typing';
import { IsMongoId, IsString } from 'class-validator';

export class AuthenticationLoginAccountMSMessage {
  @IsMongoId()
  id: string;

  @IsString()
  email: string;

  @IsString()
  displayName: string;

  constructor(
    id: AccountDomain['id'],
    email: AccountDomain['email'],
    displayName: AccountDomain['displayName']
  ) {
    this.id = id;
    this.email = email;
    this.displayName = displayName;
  }

  toString() {
    return JSON.stringify({
      id: this.id,
      email: this.email,
      displayName: this.displayName,
    });
  }
}
