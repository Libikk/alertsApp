const env = (process.env.NODE_ENV || 'development').trim();

const config = {
  env: (process.env.NODE_ENV || 'development').trim(),
  version: '1.04',
  envUrl: env === 'production' ? 'http://142.93.35.49' : 'http://localhost:3000',
  port: env === 'production' ? 80 : 3000,
};

module.exports = config;
