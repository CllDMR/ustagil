import { SuperAdminCreateOneHandler } from './super_admin-create-one/super_admin-create-one.handler';
import { SuperAdminDeleteOneHandler } from './super_admin-delete-one/super_admin-delete-one.handler';
import { SuperAdminUpdateOneHandler } from './super_admin-update-one/super_admin-update-one.handler';

export const SuperAdminCommandHandlers = [
  SuperAdminCreateOneHandler,
  SuperAdminUpdateOneHandler,
  SuperAdminDeleteOneHandler,
];

export { SuperAdminCreateOneCommand } from './super_admin-create-one/super_admin-create-one.command';
export { SuperAdminDeleteOneCommand } from './super_admin-delete-one/super_admin-delete-one.command';
export { SuperAdminUpdateOneCommand } from './super_admin-update-one/super_admin-update-one.command';
