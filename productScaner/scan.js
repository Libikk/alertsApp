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
            Promise.all(_.concat([], webScan, serverScan)).then(res =>
                console.log('RESS', _.flattenDeep(res))
                // to do update database
            )
        })

}
scanProducts()