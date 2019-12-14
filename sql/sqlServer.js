require('dotenv').config();
const { env } = require('../appConfig');
const getQuery = require('../controllers/getQuery');
const _ = require('lodash');
const sqlCredential = require('./sqlCredential');
const sql = require('mysql').createConnection(Object.assign({}, sqlCredential[env], { multipleStatements: true }));

const mysqlQueries = {
  executeRawSQL: (query, params, isDebug) => new Promise((resolve, reject) => {
    if (isDebug) {
      console.log('query: ', query);
      console.log('params: ', params);
    }
    sql.query(query, params, (error, response) => {
      if (error) reject(error);
      resolve(response);
    });
  }),
  sqlQuery: (queryNameOrRaw, params, isDebug) => {
    const rawSql = getQuery(queryNameOrRaw) || queryNameOrRaw;
    if (_.isObject(params) && !_.isArray(params)) return mysqlQueries.replaceVariablesInQuery(params, rawSql, isDebug);
    return mysqlQueries.executeRawSQL(rawSql, params, isDebug);
  },
  replaceVariablesInQuery: (params, rawSql, isDebug) => {
    const replacedParamsSql = Object.keys(params).reduce((query, nextParamKey) => {
      const singleParamValue = sql.escape(params[nextParamKey]);
      return query.replace(new RegExp(nextParamKey, 'g'), singleParamValue);
    }, rawSql);
    return mysqlQueries.executeRawSQL(replacedParamsSql, null, isDebug);
  },
  mapKeysToParams: object => Object.keys(object).reduce((acc, nextObj) => {
    acc[`@${nextObj}`] = object[nextObj];
    return acc;
  }, {}),
};

module.exports = { sql, ...mysqlQueries };
