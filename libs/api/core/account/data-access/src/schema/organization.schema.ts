import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IdentifiableSchema } from '@ustagil/api/core/common/data-access';
import { Document } from 'mongoose';

export type OrganizationDocument = Organization & Document;

@Schema({ collection: 'users' })
export class Organization extends IdentifiableSchema {
  @Prop()
  readonly displayName: string;

  @Prop()
  readonly email: string;

  @Prop()
  readonly organization: string;

  @Prop()
  readonly password: string;
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
