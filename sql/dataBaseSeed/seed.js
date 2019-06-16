const sql = require('../sqlServer');
const seedConfig = require('./seedConfig');
const _ = require('lodash');

dropExistingTables = () => {
    Object.keys(seedConfig).forEach((singleTable) => {
        sql.query(`DROP TABLE IF EXISTS ${singleTable}`)
    })
}

createNewTables = () => {
    const websites = `CREATE TABLE websites (
        websiteId int NOT NULL AUTO_INCREMENT,
        name varchar(255),
        url varchar(10000),
        urlToProduct varchar(10000),
        createdAt TIMESTAMP,
        selector varchar(255),
        regexCheck varchar(255),
        isClientSideCheck BIT,
        PRIMARY KEY (websiteId)
      )`

      const products = `CREATE TABLE products (
        productId int NOT NULL AUTO_INCREMENT,
        websiteId int NOT NULL,
        productName varchar(255),
        url varchar(10000),
        productUrl varchar(10000),
        createdAt TIMESTAMP,
        selector varchar(255),
        regexCheck varchar(255),
        isClientSideCheck BIT,
        PRIMARY KEY (productId)
      )`
      sql.query(products)
      sql.query(websites)
}

createRows = () => {
    _.mapKeys(seedConfig, (tableSeedValues, tableKey) => {
        tableSeedValues.forEach(element => {
            const stringOfColumns = Object.keys(element).reduce((acc, curColumn, index) => acc + (index === 0 ? `${curColumn}` : `, ${curColumn}`), '')
            const stringOfValues = Object.keys(element).reduce((acc, curColumn, index) => acc + (index === 0 ? `${element[curColumn]}` : `, ${element[curColumn]}`), '')
            const query = `INSERT INTO ${tableKey} (${stringOfColumns})
            VALUES (${stringOfValues})`
            sql.query(query)
        });
    })
}

dropExistingTables()
createNewTables()
createRows()
sql.end();
console.log('DB seed has been completed!')