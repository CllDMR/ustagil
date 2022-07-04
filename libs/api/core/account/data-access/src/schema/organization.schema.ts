import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IdentifiableSchema } from '@ustagil/api/core/common/data-access';
import { Role } from '@ustagil/api/core/common/typing';
import { Document } from 'mongoose';

export type OrganizationDocument = Organization & Document;

@Schema()
export class Organization extends IdentifiableSchema {
  readonly kind: string;
  readonly role: Role;
  readonly displayName: string;
  readonly email: string;
  readonly password: string;

  @Prop()
  readonly organization: string;
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
