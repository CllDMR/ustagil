import { SuperAdminCreateOneHandler } from './create-one/create-one.handler';
import { SuperAdminDeleteOneHandler } from './delete-one/delete-one.handler';
import { SuperAdminUpdateOneHandler } from './update-one/update-one.handler';

export const SuperAdminCommandHandlers = [
  SuperAdminCreateOneHandler,
  SuperAdminUpdateOneHandler,
  SuperAdminDeleteOneHandler,
];

export { SuperAdminCreateOneCommand } from './create-one/create-one.command';
export { SuperAdminDeleteOneCommand } from './delete-one/delete-one.command';
export { SuperAdminUpdateOneCommand } from './update-one/update-one.command';
