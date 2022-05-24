import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IdentifiableSchema } from '@ustagil/api/core/common/data-access';
import { Document } from 'mongoose';

export type AccountDocument = Account & Document;

@Schema({ collection: 'accounts' })
export class Account extends IdentifiableSchema {
  @Prop()
  readonly displayName: string;

  @Prop()
  readonly email: string;

  @Prop()
  readonly organization: string;

  @Prop()
  readonly password: string;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
