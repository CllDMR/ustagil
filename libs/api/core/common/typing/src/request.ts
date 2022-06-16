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
  ROLE_ACCOUNT = 2,
  ROLE_SUPER_ADMIN = 3,
  ROLE_USER = 4,
}