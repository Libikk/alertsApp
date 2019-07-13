const sql = require('mysql').createConnection({
  host: 'localhost',
  user: 'sytek',
  password: 'Cycki12345',
  database: 'discounthero',
});

const sqlQuery = (query, params) => new Promise((resolve, reject) => {
  sql.query(query, params, (error, response) => {
    if (error) reject(error);
    resolve(response);
  });
});

module.exports = { sql, sqlQuery };
