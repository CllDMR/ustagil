import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class BaseUpdateOneMSEvent {
  @IsMongoId()
  id: string;

  @IsString()
  @IsOptional()
  displayName?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  organization?: string;

  constructor(
    id: string,
    displayName?: string,
    email?: string,
    organization?: string
  ) {
    this.id = id;
    this.displayName = displayName;
    this.email = email;
    this.organization = organization;
  }

  toString() {
    return JSON.stringify({
      id: this.id,
      displayName: this.displayName,
      email: this.email,
      organization: this.organization,
    });
  }
}
