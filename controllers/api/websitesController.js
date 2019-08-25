const { executeRawSQL } = require('../../sql/sqlServer');
const fs = require('fs');

const websites = {
  getWebsitesWithProducts: (params) => {
    const sqlString = fs.readFileSync('./controllers/sqlQueries/getDataForScan.sql').toString();
    return executeRawSQL(sqlString, params);
  },
};

module.exports = websites;
