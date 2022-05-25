import { IsMongoId } from 'class-validator';

export class SuperAdminDeleteOneMSEvent {
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
