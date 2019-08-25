const serverSideScan = require('./ServerSide');
const clientSideScan = require('./ClientSide');
const { sqlQuery, executeRawSQL } = require('../sql/sqlServer');
const _ = require('lodash');

const scanManagement = {
  getProducts: (productId) => {
    const params = {
      '@productId': productId,
    };
    return sqlQuery('getDataForScan', params).catch(console.error);
  },
  scanProducts: (productId) => {
    scanManagement.getProducts(productId)
      .then((allProductsWithWebsites) => {
        console.log('allProductsWithWebsites: ', allProductsWithWebsites);
        const webScan = clientSideScan.getClientSideCheck(allProductsWithWebsites);
        const serverScan = serverSideScan.getServerSideCheck(allProductsWithWebsites);
        Promise.all(_.concat([], webScan, serverScan)).then((res) => {
          const flattenedResp = _.flattenDeep(res);
          flattenedResp.forEach((single) => {
            const params = [single.productId, single.isPromo, single.isError];
            const sqlString = 'INSERT INTO scans (productId, createdAt, isPromo, isError) values (?, now(), ?, ?)';
            executeRawSQL(sqlString, params, true);
            // to do update all of them in one query
          });
        });
      });
  },
};

module.exports = scanManagement;
