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
      isLength: {
        errorMessage: 'Password should be at least 6 chars long',
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
};

const validate = schema => checkSchema(schema);

module.exports = {
  schema: requestSchema,
  validate,
};
