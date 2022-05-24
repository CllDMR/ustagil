import { AccountReadAllHandler } from './account-read-all/account-read-all.handler';
import { AccountReadOneByEmailHandler } from './account-read-one-by-email/account-read-one-by-email.handler';
import { AccountReadOneHandler } from './account-read-one/account-read-one.handler';

export const AccountQueryHandlers = [
  AccountReadAllHandler,
  AccountReadOneHandler,
  AccountReadOneByEmailHandler,
];

export { AccountReadAllQuery } from './account-read-all/account-read-all.query';
export { AccountReadOneByEmailQuery } from './account-read-one-by-email/account-read-one-by-email.query';
export { AccountReadOneQuery } from './account-read-one/account-read-one.query';
