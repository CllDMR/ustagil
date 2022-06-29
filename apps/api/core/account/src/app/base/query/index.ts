import { BaseReadAllHandler } from './base-read-all/base-read-all.handler';
import { BaseReadOneByEmailHandler } from './base-read-one-by-email/base-read-one-by-email.handler';
import { BaseReadOneHandler } from './base-read-one/base-read-one.handler';

export const BaseQueryHandlers = [
  BaseReadAllHandler,
  BaseReadOneHandler,
  BaseReadOneByEmailHandler,
];

export { BaseReadAllQuery } from './base-read-all/base-read-all.query';
export { BaseReadOneByEmailQuery } from './base-read-one-by-email/base-read-one-by-email.query';
export { BaseReadOneQuery } from './base-read-one/base-read-one.query';
