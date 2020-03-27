const Sentry = require('@sentry/node');
const { version, env } = require('../appConfig');
const errors = require('./errors');
const pick = require('lodash/pick');

Sentry.init({
  dsn: `https://${process.env.SENTRY_PUBLIC_KEY}@sentry.io/${process.env.SENTRY_PROJECT_ID}`,
  environment: env,
  release: version,
});

const errorFormatter = (err) => {
  const preDefinedError = errors[err.name];
  if (!preDefinedError) {
    return Object.assign(Error(), {
      name: err.name || 'Unhandled error',
      message: 'Sorry! An unknown error occurred',
      code: 500,
      stack: err.stack,
      options: err.options,
    });
  }

  const errData = {
    ...pick(preDefinedError, ['name', 'code']),
    ...pick(err, ['stack', 'options', 'token']),
    message: err.options.message || preDefinedError.message,
  };

  return Object.assign(Error(), errData);
};

const sentryLogError = (err, req) => {
  if (true /* errCode === 500 || errCode === 404 */) {
    Sentry.withScope((scope) => {
      // to do: extra data
      scope.setExtra('data', { userData: req.user });
      Sentry.captureException(err);
    });
    console.error('User Data', req.user);
    console.error('Err message ', err.message);
  }
};

const errorHandler = (err, req, res, next) => {
  if (!err) {
    return next();
  }

  sentryLogError(err, req);
  const formattedError = errorFormatter(err);


  res.status(formattedError.code);
  return res.json(formattedError);
};

module.exports = { errorHandler, Sentry };
