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

  if (!errors[err.name]) {
    return Object.assign(Error(), {
      name: err.name || 'Unhandled error',
      message: 'Oops, something went wrong',
      errorMessage: 'Sorry! An unknown error occurred',
      code: 500,
      stack: err.stack,
      options: err.options,
    });
  }

  return Object.assign(Error(), pick(errors[err.name], ['name', 'message', 'code']), pick(err, ['stack', 'options', 'token']));
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
}

const errorHandler = (err, req, res, next) => {
  if (!err) {
    return next();
  }

  sentryLogError(err, req);
  const formattedError = errorFormatter(err);
  

  res.status(formattedError.code);
  return res.json({
    ...formattedError,
    msg: formattedError.message, // deprecated
  });
};

module.exports = { errorHandler, Sentry };
