import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IdentifiableSchema } from '@ustagil/api/core/common/data-access';
import { Role } from '@ustagil/api/core/common/typing';
import { Document } from 'mongoose';

export type AccountOrganizationDocument = AccountOrganization & Document;

@Schema()
export class AccountOrganization extends IdentifiableSchema {
  readonly kind: string;
  readonly role: Role;
  readonly displayName: string;
  readonly email: string;
  readonly password: string;

  @Prop()
  readonly organization: string;
}

export const AccountOrganizationSchema =
  SchemaFactory.createForClass(AccountOrganization);
