const serverSideScan = require('./ServerSide');
const clientSideScan = require('./ClientSide');
const { sqlQuery } = require('../sql/sqlServer');
const _ = require('lodash');

const scanManagement = {
  getProducts: (productId) => {
    console.log('productId: ', productId, typeof productId);
    const params = {
      '@productId': productId,
    };
    return sqlQuery('getDataForScan', params).catch(console.error);;
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
            sqlQuery(sqlString, params);
            // to do update all of them in one query
          });
        });
      });
  },
};

module.exports = scanManagement;
