const { checkSchema } = require('express-validator');
const { validatePatterns } = require('../../appConfig');

const requestSchema = {
  'POST:/api/auth/register': {
    email: {
      notEmpty: true,
      errorMessage: 'Enter correct email address',
      isEmail: true,
    },
    password: {
      notEmpty: true,
      errorMessage: 'Password should be at least 6 chars long, at least one letter and one number',
      isLength: {
        options: { min: 6, max: 100 },
      },
      matches: {
        options: [validatePatterns.passwordPattern],
      },
    },
    userName: {
      trim: true,
      notEmpty: true,
      matches: {
        options: [validatePatterns.userNamePattern],
      },
    },
  },
  'POST:/api/auth/login': {
    email: {
      notEmpty: true,
      errorMessage: 'Enter correct email address',
      isEmail: true,
    },
    password: {
      notEmpty: true,
      errorMessage: 'Password should be at least 6 chars long, at least one letter and one number',
      isLength: {
        options: { min: 6, max: 100 },
      },
      matches: {
        options: [validatePatterns.passwordPattern],
      },
    },
  },
  'POST:/api/auth/passwordReset': {
    email: {
      notEmpty: true,
      errorMessage: 'Enter correct email address',
      isEmail: true,
    },
  },
  'POST:/api/auth/authorize': {
    token: {
      notEmpty: true,
      isString: true,
      errorMessage: 'Authorization failed',
    },
  },
  'POST:/api/user/updateUserDetails': {
    userName: {
      optional: { options: { nullable: true } },
      trim: true,
      matches: {
        options: [validatePatterns.userNamePattern],
      },
    },
    password: {
      optional: { options: { nullable: true } },
      errorMessage: 'Password should be at least 6 chars long, at least one letter and one number',
      isLength: {
        options: { min: 6, max: 100 },
      },
      matches: {
        options: [validatePatterns.passwordPattern],
      },
    },
  },
  'POST:/api/user/updateUserPushNotificationToken': {
    token: {
      notEmpty: true,
      isString: true,
      matches: {
        options: [validatePatterns.pushNotificationTokenPattern],
      },
      errorMessage: 'Invalid push token',
    },
  },
  'DELETE:/api/product/deleteUserProduct': {
    productId: {
      notEmpty: true,
      isInt: true,
      errorMessage: 'Invalid product id',
    },
  },
  'GET:/api/product/productExistence': {
    productUrlData: {
      custom: {
        options: value => validatePatterns.urlPattern.test(value),
      },
      errorMessage: 'Invalid url',
    },
  },
  'POST:/api/product/addUserProduct': {
    productUrl: {
      trim: true,
      notEmpty: true,
      isString: true,
      custom: {
        options: value => validatePatterns.urlPattern.test(value),
      },
      errorMessage: 'Invalid url',
    },
  },
};

const validate = schema => checkSchema(schema);

module.exports = {
  schema: requestSchema,
  validate,
};
