const Sentry = require('@sentry/node');
const { version } = require('../appConfig');

Sentry.init({
  dsn: `https://${process.env.SENTRY_PUBLIC_KEY}@sentry.io/${process.env.SENTRY_PROJECT_ID}`,
  environment: process.env.NODE_ENV,
  release: version,
});

const errorHandler = (err, req, res, next) => {
  if (!err) {
    return next();
  }
  const errCode = err.status || 500;

  if (errCode === 500 || errCode === 404) {
    Sentry.captureException(err, { userData: req.user });
    console.error('User Data', req.user);
    console.error('Err message ', err.message);
  }

  res.status(errCode);
  return res.json({
    ...err,
    msg: err.message,
  });
};

module.exports = errorHandler;
