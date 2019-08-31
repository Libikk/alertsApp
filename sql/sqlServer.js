const { env } = require('../appConfig');
const getQuery = require('../controllers/getQuery');
const _ = require('lodash');
const sqlCredential = require('./sqlCredential');
const sql = require('mysql').createConnection(sqlCredential[env]);

const mysqlQueries = {
  executeRawSQL: (query, params) => new Promise((resolve, reject) => {
    sql.query(query, params, (error, response) => {
      if (error) reject(error);
      resolve(response);
    });
  }),
  sqlQuery: (queryNameOrRaw, params) => {
    const rawSql = getQuery(queryNameOrRaw) || queryNameOrRaw;
    if (_.isObject(params) && !_.isArray(params)) return mysqlQueries.replaceVariablesInQuery(params, rawSql);
    return mysqlQueries.executeRawSQL(rawSql, params);
  },
  replaceVariablesInQuery: (params, rawSql) => {
    const replacedParamsSql = Object.keys(params).reduce((query, nextParamKey) => {
      const singleParamValue = sql.escape(params[nextParamKey]);
      return query.replace(new RegExp(nextParamKey, 'g'), singleParamValue);
    }, rawSql);
    return mysqlQueries.executeRawSQL(replacedParamsSql);
  },
};

module.exports = { sql, ...mysqlQueries };
