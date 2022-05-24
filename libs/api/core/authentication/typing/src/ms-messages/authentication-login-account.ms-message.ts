import { AccountDomain } from '@ustagil/api/core/account/typing';
import { IsMongoId, IsString } from 'class-validator';

export class AuthenticationLoginAccountMSMessage {
  @IsMongoId()
  _id: string;

  @IsString()
  email: string;

  @IsString()
  displayName: string;

  constructor(
    _id: AccountDomain['_id'],
    email: AccountDomain['email'],
    displayName: AccountDomain['displayName']
  ) {
    this._id = _id;
    this.email = email;
    this.displayName = displayName;
  }

  toString() {
    return JSON.stringify({
      _id: this._id,
      email: this.email,
      displayName: this.displayName,
    });
  }
}
