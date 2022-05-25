import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IdentifiableSchema } from '@ustagil/api/core/common/data-access';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ collection: 'users' })
export class User extends IdentifiableSchema {
  @Prop()
  readonly displayName: string;

  @Prop()
  readonly email: string;

  @Prop()
  readonly organization: string;

  @Prop()
  readonly password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
