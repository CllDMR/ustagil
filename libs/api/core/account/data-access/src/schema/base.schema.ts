import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IdentifiableSchema } from '@ustagil/api/core/common/data-access';
import { Role } from '@ustagil/api/core/common/typing';
import { Document } from 'mongoose';

export type BaseDocument = Base & Document;

@Schema({ collection: 'bases' })
export class Base extends IdentifiableSchema {
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
    default: Role.ROLE_BASE,
  })
  readonly role: Role;
}

export const BaseSchema = SchemaFactory.createForClass(Base);
