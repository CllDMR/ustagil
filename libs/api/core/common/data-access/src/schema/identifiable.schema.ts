import { Prop } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';

export abstract class IdentifiableSchema {
  @Prop()
  readonly _id: ObjectId;
}
