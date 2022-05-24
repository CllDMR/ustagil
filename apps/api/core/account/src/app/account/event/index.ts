import { AccountCreatedOneHandler } from './account-created-one/account-created-one.handler';
import { AccountDeletedOneHandler } from './account-deleted-one/account-deleted-one.handler';
import { AccountReadedAllHandler } from './account-readed-all/account-readed-all.handler';
import { AccountReadedOneByEmailHandler } from './account-readed-one-by-email/account-readed-one-by-email.handler';
import { AccountReadedOneHandler } from './account-readed-one/account-readed-one.handler';
import { AccountUpdatedOneHandler } from './account-updated-one/account-updated-one.handler';

export const AccountEventHandlers = [
  AccountCreatedOneHandler,
  AccountUpdatedOneHandler,
  AccountDeletedOneHandler,
  AccountReadedAllHandler,
  AccountReadedOneHandler,
  AccountReadedOneByEmailHandler,
];

export { AccountCreatedOneEvent } from './account-created-one/account-created-one.event';
export { AccountDeletedOneEvent } from './account-deleted-one/account-deleted-one.event';
export { AccountReadedAllEvent } from './account-readed-all/account-readed-all.event';
export { AccountReadedOneByEmailEvent } from './account-readed-one-by-email/account-readed-one-by-email.event';
export { AccountReadedOneEvent } from './account-readed-one/account-readed-one.event';
export { AccountUpdatedOneEvent } from './account-updated-one/account-updated-one.event';
