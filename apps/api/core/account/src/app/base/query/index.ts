import { BaseReadAllHandler } from './read-all/read-all.handler';
import { BaseReadOneByEmailHandler } from './read-one-by-email/read-one-by-email.handler';
import { BaseReadOneHandler } from './read-one/read-one.handler';

export const BaseQueryHandlers = [
  BaseReadAllHandler,
  BaseReadOneHandler,
  BaseReadOneByEmailHandler,
];

export { BaseReadAllQuery } from './read-all/read-all.query';
export { BaseReadOneByEmailQuery } from './read-one-by-email/read-one-by-email.query';
export { BaseReadOneQuery } from './read-one/read-one.query';
