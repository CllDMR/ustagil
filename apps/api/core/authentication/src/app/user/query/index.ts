import { UserLoginHandler } from './login/login.handler';
import { UserValidateHandler } from './validate/validate.handler';

export const UserQueryHandlers = [UserLoginHandler, UserValidateHandler];

export { UserLoginQuery } from './login/login.query';
export { UserValidateQuery } from './validate/validate.query';
