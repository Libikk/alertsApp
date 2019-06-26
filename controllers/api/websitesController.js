const { sqlQuery } = require('../../sql/sqlServer');
const fs = require('fs');

const websites = {
  getWebsitesWithProducts: (params) => {
    const sqlString = fs.readFileSync('./controllers/sqlQueries/getDataForScan.sql').toString();
    return sqlQuery(sqlString, params);
  },
};

module.exports = websites;
