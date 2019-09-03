const Sentry = require('@sentry/node');

Sentry.init({
  dsn: `https://${process.env.SENTRY_PUBLIC_KEY}@sentry.io/${process.env.SENTRY_PROJECT_ID}`,
  environment: process.env.NODE_ENV,
});

const errorHandler = (err, req, res, next) => {
  if (!err) {
    return next();
  }
  Sentry.captureException(err, 'Uncaught Exception thrown');
  console.error('Error:  ', err.message);
  res.status(err.status || 500);
  return res.json({
    ...err,
    msg: err.message,
  });
};

module.exports = errorHandler;
