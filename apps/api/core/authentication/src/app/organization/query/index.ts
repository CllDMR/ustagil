import { OrganizationLoginHandler } from './login/login.handler';
import { OrganizationValidateHandler } from './validate/validate.handler';

export const OrganizationQueryHandlers = [
  OrganizationLoginHandler,
  OrganizationValidateHandler,
];

export { OrganizationLoginQuery } from './login/login.query';
export { OrganizationValidateQuery } from './validate/validate.query';
