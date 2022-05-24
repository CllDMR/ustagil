import { AccountCreateOneHandler } from './account-create-one/account-create-one.handler';
import { AccountDeleteOneHandler } from './account-delete-one/account-delete-one.handler';
import { AccountUpdateOneHandler } from './account-update-one/account-update-one.handler';

export const AccountCommandHandlers = [
  AccountCreateOneHandler,
  AccountUpdateOneHandler,
  AccountDeleteOneHandler,
];

export { AccountCreateOneCommand } from './account-create-one/account-create-one.command';
export { AccountDeleteOneCommand } from './account-delete-one/account-delete-one.command';
export { AccountUpdateOneCommand } from './account-update-one/account-update-one.command';
