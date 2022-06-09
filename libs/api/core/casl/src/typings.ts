import { UserDomain } from '@ustagil/api/core/account/typing';
import type { Request } from 'express';

export type MyRequest = Request & {
  user: {
    user_id: UserDomain['id'];
    // account_ids: UserDomain['accounts'];
    // role: UserDomain['role'];
  };
  jwtPayload: JWTPayload;
};

export type JWTPayload = { usr: string; accs: string[]; role: Role };

export enum Role {
  DEFAULT,
  CORPORATE_ADMIN,
  INDIVIDUAL_ADMIN,
  CORPORATE,
  INDIVIDUAL,
  SUPER_ADMIN,
}
