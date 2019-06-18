const sql = require('../../sql/sqlServer');
const websites = {
    getWebsitesWithProducts: () => {
        return new Promise(function(resolve, reject) {
            var sqlQuery = require('fs').readFileSync('./controllers/api/getDataForScan.sql').toString();
            sql.query(sqlQuery, (err, result, fields) => {
                if (err) return reject(err);
                resolve(result)
            })
            sql.end()
        })
    }
}

module.exports = websites
