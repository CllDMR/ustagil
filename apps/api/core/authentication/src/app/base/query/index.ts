import { BaseLoginHandler } from './login/login.handler';
import { BaseValidateHandler } from './validate/validate.handler';

export const BaseQueryHandlers = [BaseLoginHandler, BaseValidateHandler];

export { BaseLoginQuery } from './login/login.query';
export { BaseValidateQuery } from './validate/validate.query';
