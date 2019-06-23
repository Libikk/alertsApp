const serverSideScan = require('./ServerSide');
const clientSideScan = require('./ClientSide');
const websitesController = require('../controllers/api/websitesController');
const { sql, sqlQuery } = require('../sql/sqlServer');
const _ = require('lodash');

saveSingleItem = () => {


}

scanProducts = () => {
    websitesController.getWebsitesWithProducts()
        .then((allProductsWithWebsites) => {
            const webScan = clientSideScan.getClientSideCheck(allProductsWithWebsites)
            const serverScan = serverSideScan.getServerSideCheck(allProductsWithWebsites)
            Promise.all(_.concat([], webScan, serverScan)).then(res =>{
                const flattenedResp = _.flattenDeep(res)
                flattenedResp.forEach(single => {
                    const params = [single.productId, single.isPromo, single.isError]
                    const sql = `INSERT INTO scans (productId, createdAt, isPromo, isError) values (?, now(), ?, ?)`
                    sqlQuery(sql, params)
                    //to do update all of them in one query
                });
              }
            )
        })

}
scanProducts()