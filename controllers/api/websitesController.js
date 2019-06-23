const { sqlQuery} = require('../../sql/sqlServer');

const websites = {
    getWebsitesWithProducts: (params) => {
        var sql = require('fs').readFileSync('./controllers/sqlQueries/getDataForScan.sql').toString();
        return sqlQuery(sql, params)
    }
}

module.exports = websites
