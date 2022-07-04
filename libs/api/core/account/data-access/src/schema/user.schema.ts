import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { IdentifiableSchema } from '@ustagil/api/core/common/data-access';
import { Role } from '@ustagil/api/core/common/typing';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User extends IdentifiableSchema {
  readonly kind: string;
  readonly role: Role;
  readonly displayName: string;
  readonly email: string;
  readonly password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
