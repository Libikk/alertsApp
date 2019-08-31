const dbCredential = {
  development: {
    host: 'localhost',
    user: 'sytek',
    password: 'Cycki12345',
    database: 'discounthero',
  },
  production: {
    host: 'localhost',
    user: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: 'discounthero',
  },
};

module.exports = { ...dbCredential };
