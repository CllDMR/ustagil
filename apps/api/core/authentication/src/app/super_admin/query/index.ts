import { SuperAdminLoginHandler } from './login/login.handler';
import { SuperAdminValidateHandler } from './validate/validate.handler';

export const SuperAdminQueryHandlers = [
  SuperAdminLoginHandler,
  SuperAdminValidateHandler,
];

export { SuperAdminLoginQuery } from './login/login.query';
export { SuperAdminValidateQuery } from './validate/validate.query';
