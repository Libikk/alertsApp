const serverSideScan = require('./ServerSide');
const clientSideScan = require('./ClientSide');
const { sqlQuery } = require('../sql/sqlServer');
const { sendNotifications } = require('../notifications/notificationManagement');
const _ = require('lodash');

const scanManagement = {
  getProducts: productId => sqlQuery('getDataForScan', { '@productId': productId }).catch(console.error),
  scanProducts: (productId) => {
    scanManagement.getProducts(productId)
      .then((allProductsWithWebsites) => {
        const webScan = clientSideScan.getClientSideCheck(allProductsWithWebsites);
        const serverScan = serverSideScan.getServerSideCheck(allProductsWithWebsites);
        return Promise.all(_.concat([], webScan, serverScan))
          .then(async (res) => {
            const flattenedResp = _.flattenDeep(res);
            // eslint-disable-next-line no-restricted-syntax
            for (const single of flattenedResp) {
              if (single.imgUrl || single.productName) await sqlQuery('updateProductAfterScan', [single.imgUrl, single.productName, single.productId]);
              await sqlQuery(
                'INSERT INTO scans (productId, createdAt, isPromo, isError, productPrice, productDiscountedPrice) values (?, now(), ?, ?, ?, ?)',
                [single.productId, single.isPromo, single.isError, single.productPrice, single.productDiscountedPrice]
              ).catch(console.error);
            // to do update all of them in one query
            }
          })
          .then(() => {
            console.log('Scan has been finished.'); // eslint-disable-line
            sendNotifications();
          });
      });
  },
  testScan: (products) => {
    const parsedProducts = products.reduce((acc, nextObj) => {
      const { discountedProductUrl, notDiscountedProductUrl, isDiscountSelectorRegex, isDiscountSelector } = nextObj;
      if (discountedProductUrl && notDiscountedProductUrl) {
        const splittedProducts = [discountedProductUrl, notDiscountedProductUrl].map(fullUrl => ({ ...nextObj, fullUrl, regex: isDiscountSelectorRegex, selectorString: isDiscountSelector }));
        return acc.concat(splittedProducts);
      }
      return acc;
    }, []);

    return clientSideScan.getClientSideCheck(parsedProducts);
  },
};

module.exports = scanManagement;
