import { OrganizationCreateOneHandler } from './organization-create-one/organization-create-one.handler';
import { OrganizationDeleteOneHandler } from './organization-delete-one/organization-delete-one.handler';
import { OrganizationUpdateOneHandler } from './organization-update-one/organization-update-one.handler';

export const OrganizationCommandHandlers = [
  OrganizationCreateOneHandler,
  OrganizationUpdateOneHandler,
  OrganizationDeleteOneHandler,
];

export { OrganizationCreateOneCommand } from './organization-create-one/organization-create-one.command';
export { OrganizationDeleteOneCommand } from './organization-delete-one/organization-delete-one.command';
export { OrganizationUpdateOneCommand } from './organization-update-one/organization-update-one.command';
