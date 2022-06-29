import { IsMongoId } from 'class-validator';

export class BaseDeleteOneMSEvent {
  @IsMongoId()
  id: string;

  constructor(id: string) {
    this.id = id;
  }

  toString() {
    return JSON.stringify({
      id: this.id,
    });
  }
}
