import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IdentifiableSchema } from '@ustagil/api/core/common/data-access';
import { Role } from '@ustagil/api/core/common/typing';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ collection: 'users' })
export class User extends IdentifiableSchema {
  @Prop()
  readonly displayName: string;

  @Prop({
    unique: true,
  })
  readonly email: string;

  @Prop()
  readonly organization: string;

  @Prop({
    select: false,
  })
  readonly password: string;

  @Prop({
    type: Number,
    enum: Role,
    default: Role.ROLE_USER,
  })
  readonly role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
