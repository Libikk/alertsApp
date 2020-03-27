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
};

const validate = schema => checkSchema(schema);

module.exports = {
  schema: requestSchema,
  validate,
};
