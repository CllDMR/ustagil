import { AccountSuperAdminCreateOneHandler } from './create-one/create-one.handler';
import { AccountSuperAdminDeleteOneHandler } from './delete-one/delete-one.handler';
import { AccountSuperAdminUpdateOneHandler } from './update-one/update-one.handler';

export const AccountSuperAdminCommandHandlers = [
  AccountSuperAdminCreateOneHandler,
  AccountSuperAdminUpdateOneHandler,
  AccountSuperAdminDeleteOneHandler,
];

export { AccountSuperAdminCreateOneCommand } from './create-one/create-one.command';
export { AccountSuperAdminDeleteOneCommand } from './delete-one/delete-one.command';
export { AccountSuperAdminUpdateOneCommand } from './update-one/update-one.command';
