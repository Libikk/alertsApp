const scanService = require('./scan');

const { sqlQuery } = require('../sql/sqlServer');
sqlQuery('addUserProduct').then(console.log)
//scanService.scanProducts(4);