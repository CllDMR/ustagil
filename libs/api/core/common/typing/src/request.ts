import type { Request } from 'express';

export type MyRequest = Request & {
  user: {
    id: string;
    role: Role;
  };
  jwtPayload: JWTPayload;
};

export type JWTPayload = { sub: string; role: Role };

export enum Role {
  ROLE_UNSPECIFIED = 0,
  ROLE_ORGANIZATION = 1,
  ROLE_BASE = 2,
  ROLE_SUPER_ADMIN = 3,
  ROLE_USER = 4,
}

export enum AccountKind {
  ACCOUNT_KIND_BASE = 0,
  ACCOUNT_KIND_ORGANIZATION = 1,
  ACCOUNT_KIND_SUPER_ADMIN = 2,
  ACCOUNT_KIND_USER = 3,
}
