const errors = {
  USER_ALREADY_EXIST: {
    name: 'USER_ALREADY_EXIST',
    message: 'User not found',
    code: 401,
  },
  INVALID_VALUE: {
    name: 'INVALID_VALUE',
    message: 'Invalid value',
    code: 422,
  },
  SCHEMA_VALIDATION_FAILED: {
    name: 'SCHEMA_VALIDATION_FAILED',
    message: 'Wrong request',
    code: 403,
  },
  WRONG_PASSWORD_OR_EMAIL: {
    name: 'WRONG_PASSWORD_OR_EMAIL',
    message: 'Wrong Email or Password',
    code: 401,
  },
  WRONG_PASSWORD: {
    name: 'WRONG_PASSWORD',
    message: 'Wrong password',
    code: 401,
  },
  USER_NOT_FOUND: {
    name: 'USER_NOT_FOUND',
    message: 'User not found',
    code: 401,
  },
  ACCOUNT_ALREADY_ACTIVE: {
    name: 'ACCOUNT_ALREADY_ACTIVE',
    message: 'You\'r account is already active',
    code: 401,
  },
  EMAIL_ALREADY_SENT: {
    name: 'EMAIL_ALREADY_SENT',
    message: 'Email has been sent already',
    code: 400,
  },
  PASSWORDS_CHANGE: {
    name: 'PASSWORD_CHANGE',
    message: 'Password couldn\t be changed, make sure provided email is correct.',
    code: 400,
  },
  PRODUCT_ALREADY_EXIST: {
    name: 'PRODUCT_ALREADY_EXIST',
    message: 'This product already exist',
    code: 401,
  },
  PRODUCT_IS_ALREADY_ADDED: {
    name: 'PRODUCT_IS_ALREADY_ADDED',
    message: 'This product is already in your product list',
    code: 401,
  },
  PASSWORD_WRONG_FORMAT: {
    name: 'PRODUCT_IS_ALREADY_ADDED',
    message: 'Password wrong format',
    code: 401,
  },
  BAD_REQUEST: {
    name: 'BAD_REQUEST',
    message: 'Oops, something went wrong',
    code: 400,
  },
  INVALID_TOKEN: {
    name: 'INVALID_TOKEN',
    message: 'Take is invalid',
    code: 415,
  },
  FORBIDDEN: {
    name: 'FORBIDDEN',
    message: 'No permission to do that',
    code: 403,
  },
};

module.exports = errors;
