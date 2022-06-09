import { UserReadAllHandler } from './user-read-all/user-read-all.handler';
import { UserReadOneByEmailHandler } from './user-read-one-by-email/user-read-one-by-email.handler';
import { UserReadOneHandler } from './user-read-one/user-read-one.handler';

export const UserQueryHandlers = [
  UserReadAllHandler,
  UserReadOneHandler,
  UserReadOneByEmailHandler,
];

export { UserReadAllQuery } from './user-read-all/user-read-all.query';
export { UserReadOneByEmailQuery } from './user-read-one-by-email/user-read-one-by-email.query';
export { UserReadOneQuery } from './user-read-one/user-read-one.query';
