import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IdentifiableSchema } from '@ustagil/api/core/common/data-access';
import { AccountKind, Role } from '@ustagil/api/core/common/typing';
import { Document } from 'mongoose';

export type AccountBaseDocument = AccountBase & Document;

@Schema({ collection: 'accounts', discriminatorKey: 'kind' })
export class AccountBase extends IdentifiableSchema {
  @Prop({
    type: String,
    required: true,
    enum: AccountKind,
  })
  readonly kind: string;

  @Prop({
    type: Number,
    enum: Role,
    default: Role.ROLE_BASE,
  })
  readonly role: Role;

  @Prop()
  readonly displayName: string;

  @Prop({
    unique: true,
  })
  readonly email: string;

  @Prop({
    select: false,
  })
  readonly password: string;
}

export const AccountBaseSchema = SchemaFactory.createForClass(AccountBase);
