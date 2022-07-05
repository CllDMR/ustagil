import { IsString } from 'class-validator';

export class AccountBaseReadOneMSMessage {
  @IsString()
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
