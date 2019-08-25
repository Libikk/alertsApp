const getQuery = require('../controllers/getQuery');
const _ = require('lodash');
const sql = require('mysql').createConnection({
  host: 'localhost',
  user: 'sytek',
  password: 'Cycki12345',
  database: 'discounthero',
});

const executeRawSQL = (query, params) => new Promise((resolve, reject) => {
  sql.query(query, params, (error, response) => {
    if (error) reject(error);
    resolve(response);
  });
});

const sqlQuery = (queryNameOrRaw, params) => {
  const rawSql = getQuery(queryNameOrRaw) || queryNameOrRaw;

  if (_.isObject(params) && !_.isArray(params)) {
    const replacedParamsSql = Object.keys(params).reduce((query, nextParamKey) => {
      const singleParamValue = sql.escape(params[nextParamKey]);
      return query.replace(new RegExp(nextParamKey, 'g'), singleParamValue);
    }, rawSql);
    return executeRawSQL(replacedParamsSql);
  }

  return executeRawSQL(rawSql, params);
};

module.exports = { sql, sqlQuery, executeRawSQL };
