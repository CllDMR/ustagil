import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IdentifiableSchema } from '@ustagil/api/core/common/data-access';
import { Role } from '@ustagil/api/core/common/typing';
import { Document } from 'mongoose';

export type SuperAdminDocument = SuperAdmin & Document;

@Schema({ collection: 'super_admins' })
export class SuperAdmin extends IdentifiableSchema {
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
    default: Role.ROLE_SUPER_ADMIN,
  })
  readonly role: Role;
}

export const SuperAdminSchema = SchemaFactory.createForClass(SuperAdmin);
