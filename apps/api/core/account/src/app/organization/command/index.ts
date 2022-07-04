import { OrganizationCreateOneHandler } from './create-one/create-one.handler';
import { OrganizationDeleteOneHandler } from './delete-one/delete-one.handler';
import { OrganizationUpdateOneHandler } from './update-one/update-one.handler';

export const OrganizationCommandHandlers = [
  OrganizationCreateOneHandler,
  OrganizationUpdateOneHandler,
  OrganizationDeleteOneHandler,
];

export { OrganizationCreateOneCommand } from './create-one/create-one.command';
export { OrganizationDeleteOneCommand } from './delete-one/delete-one.command';
export { OrganizationUpdateOneCommand } from './update-one/update-one.command';
